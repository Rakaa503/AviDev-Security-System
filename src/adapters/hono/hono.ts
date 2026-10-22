import type { HonoAdapterOptions } from "./types";

export class HonoAdapter {
  private readonly options: Required<HonoAdapterOptions>;

  constructor(options: HonoAdapterOptions = {}) {
    this.options = {
      logger: options.logger ?? true,
      security: options.security ?? true,
      auth: options.auth ?? false,
    };
  }

  /**
   * Adapter configuration
   */
  get config(): Required<HonoAdapterOptions> {
    return this.options;
  }
}

/**
 * Create a new AVSS Hono adapter.
 */
export function createHono(
  options?: HonoAdapterOptions,
): HonoAdapter {
  return new HonoAdapter(options);
}