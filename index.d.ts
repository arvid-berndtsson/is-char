/**
 * Options for {@link isChar}.
 */
export interface IsCharOptions {
  /**
   * Optional matching constraint.
   *
   * When defined, this must be exactly one JavaScript UTF-16 code unit and
   * must equal the value being validated. `undefined` means no constraint.
   */
  is?: string;
}

/**
 * Check whether a value is exactly one JavaScript UTF-16 code unit.
 *
 * This function intentionally uses JavaScript's `value.length === 1` rule.
 * It does not count Unicode code points or user-perceived grapheme clusters.
 * Non-string values are rejected without coercion.
 *
 * @example Basic validation
 * ```ts
 * isChar("a"); // true
 * isChar("ab"); // false
 * isChar(1); // false
 * ```
 *
 * @example Matching a specific code unit
 * ```ts
 * isChar("-", { is: "-" }); // true
 * isChar("-", { is: "/" }); // false
 * ```
 *
 * @example UTF-16 semantics
 * ```ts
 * isChar("é"); // true, one UTF-16 code unit
 * isChar("e\\u0301"); // false, two UTF-16 code units
 * isChar("😀"); // false, two UTF-16 code units
 * ```
 */
export default function isChar(value: unknown, options?: IsCharOptions): boolean;
