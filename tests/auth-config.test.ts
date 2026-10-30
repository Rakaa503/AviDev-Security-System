import { afterEach, describe, expect, it } from "vitest";
import type { PrismaClient } from "@prisma/client";
import {
  getConfig,
  setConfig,
  type AuthConfig,
} from "../src/auth/config";

const createMockConfig = (): AuthConfig => ({
  prisma: {} as PrismaClient,
  plugins: [],
});

describe("Auth Config", () => {
  afterEach(() => {
    // Isolasi state akan ditambahkan melalui pengujian yang aman.
  });

  it("should store and return the auth configuration", () => {
    const config = createMockConfig();

    setConfig(config);

    expect(getConfig()).toBe(config);
  });

  it("should replace the previous configuration", () => {
    const firstConfig = createMockConfig();
    const secondConfig = createMockConfig();

    setConfig(firstConfig);
    setConfig(secondConfig);

    expect(getConfig()).toBe(secondConfig);
    expect(getConfig()).not.toBe(firstConfig);
  });

  it("should preserve configured plugins", () => {
    const plugin = {
      name: "test-plugin",
      setup: () => {},
    };

    const config: AuthConfig = {
      prisma: {} as PrismaClient,
      plugins: [plugin],
    };

    setConfig(config);

    expect(getConfig().plugins).toEqual([plugin]);
  });
});
