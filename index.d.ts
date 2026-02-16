/**
 * Options for {@link isChar}.
 */
export interface IsCharOptions {
  /**
   * Require the value to match this specific single-character string.
   */
  is?: string;
}

/**
 * Check whether a value is a single-character string.
 *
 * When `options.is` is provided, the value must also match that character.
 */
export default function isChar(value: unknown, options?: IsCharOptions): boolean;
