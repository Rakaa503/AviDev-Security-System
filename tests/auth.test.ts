import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PrismaClient } from "@prisma/client";
import type { AuthConfig } from "../src/auth/config";

const mocks = vi.hoisted(() => ({
  betterAuth: vi.fn(),
  prismaAdapter: vi.fn(),
}));

vi.mock("better-auth", () => ({
  betterAuth: mocks.betterAuth,
}));

vi.mock("better-auth/adapters/prisma", () => ({
  prismaAdapter: mocks.prismaAdapter,
}));

import { createAuth } from "../src/auth/auth";
import { getConfig } from "../src/auth/config";

describe("createAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.prismaAdapter.mockReturnValue({
      adapter: "mock-prisma-adapter",
    });

    mocks.betterAuth.mockReturnValue({
      auth: "mock-better-auth",
    });
  });

  const createConfig = (
    plugins: AuthConfig["plugins"] = [],
  ): AuthConfig => ({
    prisma: {} as PrismaClient,
    plugins,
  });

  it("should save the provided configuration", () => {
    const config = createConfig();

    createAuth(config);

    expect(getConfig()).toBe(config);
  });

  it("should initialize Better Auth with the Prisma adapter", () => {
    const config = createConfig();

    const result = createAuth(config);

    expect(mocks.prismaAdapter).toHaveBeenCalledWith(config.prisma, {
      provider: "postgresql",
    });

    expect(mocks.betterAuth).toHaveBeenCalledWith({
      database: {
        adapter: "mock-prisma-adapter",
      },
    });

    expect(result).toEqual({
      auth: "mock-better-auth",
    });
  });

  it("should run each plugin setup exactly once", () => {
    const firstPlugin = {
      name: "first-plugin",
      setup: vi.fn(),
    };

    const secondPlugin = {
      name: "second-plugin",
      setup: vi.fn(),
    };

    createAuth(createConfig([firstPlugin, secondPlugin]));

    expect(firstPlugin.setup).toHaveBeenCalledTimes(1);
    expect(secondPlugin.setup).toHaveBeenCalledTimes(1);
  });

  it("should initialize without plugins", () => {
    expect(() => createAuth(createConfig())).not.toThrow();

    expect(mocks.betterAuth).toHaveBeenCalledTimes(1);
  });

  it("should propagate errors thrown by plugin setup", () => {
    const pluginError = new Error("Plugin setup failed");

    const plugin = {
      name: "failing-plugin",
      setup: vi.fn(() => {
        throw pluginError;
      }),
    };

    expect(() => createAuth(createConfig([plugin]))).toThrow(pluginError);

    expect(mocks.betterAuth).not.toHaveBeenCalled();
  });
});
