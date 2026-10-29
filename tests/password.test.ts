import { describe, expect, it } from "vitest";
import {
  hashPassword,
  verifyPassword,
  needsRehash,
  generatePassword,
} from "../src/auth/password";

describe("AVSS Lite Password", () => {
  describe("hashPassword", () => {
    it("should generate an Argon2id hash", async () => {
      const hash = await hashPassword("AvssLite123!");

      expect(hash).toMatch(/^\$argon2id\$/);
    });
  });

  describe("verifyPassword", () => {
    it("should verify the correct password", async () => {
      const password = "AvssLite123!";
      const hash = await hashPassword(password);

      await expect(verifyPassword(password, hash))
        .resolves.toBe(true);
    });

    it("should reject an incorrect password", async () => {
      const hash = await hashPassword("AvssLite123!");

      await expect(verifyPassword("WrongPassword123!", hash))
        .resolves.toBe(false);
    });
  });

  describe("needsRehash", () => {
    it("should not require rehash for a hash using current parameters", async () => {
      const hash = await hashPassword("AvssLite123!");

      await expect(needsRehash(hash)).resolves.toBe(false);
    });
  });

  describe("generatePassword", () => {
    it("should generate a password with the default length", () => {
      const password = generatePassword();

      expect(password).toHaveLength(16);
      expect(password).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it("should generate a password with the requested length", () => {
      const password = generatePassword(12);

      expect(password).toHaveLength(12);
    });

    it("should generate different passwords across successive calls", () => {
      const first = generatePassword();
      const second = generatePassword();

      expect(first).not.toBe(second);
    });
  });
});
