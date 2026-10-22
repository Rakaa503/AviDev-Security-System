export interface HonoAdapterOptions {
  /**
   * Enable logger middleware.
   * @default true
   */
  logger?: boolean;

  /**
   * Enable security middleware.
   * @default true
   */
  security?: boolean;

  /**
   * Enable authentication middleware.
   * @default false
   */
  auth?: boolean;
}