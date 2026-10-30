import { describe, expect, it } from "vitest";
import { z } from "zod";
import { validate, validateOrThrow } from "../src/validation";

describe("AVSS Lite Validation", () => {
  const userSchema = z.object({
    name: z.string().min(1),
    age: z.number().int().min(18),
  });

  describe("validate", () => {
    it("should return parsed data for valid input", () => {
      const result = validate(userSchema, {
        name: "Rakha",
        age: 21,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        name: "Rakha",
        age: 21,
      });
      expect(result.errors).toBeUndefined();
    });

    it("should return errors for invalid input", () => {
      const result = validate(userSchema, {
        name: "",
        age: 15,
      });

      expect(result.success).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it("should reject input with the wrong data type", () => {
      const result = validate(userSchema, {
        name: 123,
        age: "21",
      });

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it("should reject null input", () => {
      const result = validate(userSchema, null);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  describe("validateOrThrow", () => {
    it("should return parsed data for valid input", () => {
      const result = validateOrThrow(userSchema, {
        name: "Rakha",
        age: 21,
      });

      expect(result).toEqual({
        name: "Rakha",
        age: 21,
      });
    });

    it("should throw for invalid input", () => {
      expect(() =>
        validateOrThrow(userSchema, {
          name: "",
          age: 15,
        })
      ).toThrow();
    });

    it("should throw for null input", () => {
      expect(() => validateOrThrow(userSchema, null)).toThrow();
    });
  });
});
