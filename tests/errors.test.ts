import { describe, expect, it } from "vitest";
import { AVSSError } from "../src/errors/base";
import { ErrorCode } from "../src/errors/codes";
import { errorHandler } from "../src/errors/handler";

describe("AVSS Lite Error Handling", () => {
  describe("AVSSError", () => {
    it("should preserve the error message and status", () => {
      const error = new AVSSError(
        "Authentication required",
        401,
        ErrorCode.UNAUTHORIZED
      );

      expect(error.message).toBe("Authentication required");
      expect(error.status).toBe(401);
      expect(error.code).toBe(ErrorCode.UNAUTHORIZED);
    });

    it("should use the class name as the error name", () => {
      const error = new AVSSError(
        "Forbidden",
        403,
        ErrorCode.FORBIDDEN
      );

      expect(error.name).toBe("AVSSError");
    });

    it("should create a valid timestamp", () => {
      const error = new AVSSError(
        "Validation failed",
        400,
        ErrorCode.VALIDATION_ERROR
      );

      expect(error.timestamp).toBeInstanceOf(Date);
      expect(Number.isNaN(error.timestamp.getTime())).toBe(false);
    });

    it("should serialize the error with an ISO timestamp", () => {
      const error = new AVSSError(
        "Session expired",
        401,
        ErrorCode.SESSION_EXPIRED
      );

      const result = error.toJSON();

      expect(result.name).toBe("AVSSError");
      expect(result.message).toBe("Session expired");
      expect(result.status).toBe(401);
      expect(result.code).toBe(ErrorCode.SESSION_EXPIRED);
      expect(result.timestamp).toBe(error.timestamp.toISOString());
    });

    it("should behave as an Error instance", () => {
      const error = new AVSSError(
        "Internal error",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AVSSError);
    });
  });

  describe("errorHandler", () => {
    it("should preserve AVSSError details", () => {
      const error = new AVSSError(
        "Access denied",
        403,
        ErrorCode.FORBIDDEN
      );

      const result = errorHandler(error);

      expect(result.success).toBe(false);
      expect(result.error.name).toBe("AVSSError");
      expect(result.error.message).toBe("Access denied");
      expect(result.error.status).toBe(403);
      expect(result.error.code).toBe(ErrorCode.FORBIDDEN);
      expect(result.error.timestamp).toBe(error.timestamp.toISOString());
    });

    it("should return a generic response for ordinary errors", () => {
      const result = errorHandler(new Error("Database password leaked"));

      expect(result.success).toBe(false);
      expect(result.error.name).toBe("InternalServerError");
      expect(result.error.message).toBe("Internal Server Error");
      expect(result.error.status).toBe(500);
      expect(result.error.code).toBe("INTERNAL_SERVER_ERROR");
      expect(result.error.message).not.toContain("Database password leaked");
    });

    it("should handle string input as an unknown error", () => {
      const result = errorHandler("Sensitive internal information");

      expect(result.success).toBe(false);
      expect(result.error.status).toBe(500);
      expect(result.error.message).toBe("Internal Server Error");
    });

    it("should handle null input as an unknown error", () => {
      const result = errorHandler(null);

      expect(result.success).toBe(false);
      expect(result.error.status).toBe(500);
      expect(result.error.message).toBe("Internal Server Error");
    });

    it("should return a valid ISO timestamp for unknown errors", () => {
      const result = errorHandler(new Error("Unexpected failure"));

      expect(Number.isNaN(Date.parse(result.error.timestamp))).toBe(false);
      expect(new Date(result.error.timestamp).toISOString()).toBe(
        result.error.timestamp
      );
    });
  });
});
