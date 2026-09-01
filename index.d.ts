/**
 * Options for {@link isChar}.
 *
 * The options object is optional. If it is omitted, `isChar` only checks the
 * length and type of the value. If `is` is present, the value must also match
 * it exactly.
 */
export interface IsCharOptions {
  /**
   * Require the value to equal this UTF-16 code unit.
   *
   * At runtime, `is` must be a string with `length === 1`. An empty string,
   * a longer string, or any non-string value supplied at runtime causes the
   * check to return `false`. `undefined` means that no matching constraint is
   * applied.
   *
   * @defaultValue `undefined`
   *
   * @example
   * ```ts
   * isChar("-", { is: "-" }); // true
   * isChar("/", { is: "-" }); // false
   * ```
   */
  is?: string;
}

/**
 * Check whether a value is exactly one JavaScript UTF-16 code unit.
 *
 * A value passes only when it is a primitive string and `value.length === 1`.
 * The function returns a boolean and never coerces, trims, normalizes, or
 * transforms the input.
 *
 * @remarks
 * JavaScript string `length` counts UTF-16 code units. This is intentionally
 * the definition used by this package. It is not a Unicode code-point check
 * and it is not a user-perceived grapheme-cluster check.
 *
 * Consequently:
 *
 * - `"a"` passes because it has one UTF-16 code unit.
 * - `"é"` passes because it has one UTF-16 code unit.
 * - `"e\\u0301"` fails because it has two UTF-16 code units, even though it
 *   may be displayed as one user-perceived character.
 * - `"😀"` fails because it has two UTF-16 code units, even though it is one
 *   Unicode code point.
 * - `"♥"` passes because it has one UTF-16 code unit, regardless of whether a
 *   font renders it as a text symbol or an emoji-style symbol.
 *
 * This narrow rule is deliberate. Use a Unicode code-point or grapheme
 * library when the application needs those different meanings of character.
 *
 * @param value The value to validate. Non-string values return `false`.
 * @param options Optional matching constraint. When `options.is` is defined,
 *   the value must be exactly equal to it.
 * @returns `true` if the value satisfies the UTF-16 code-unit rule and the
 *   optional matching constraint; otherwise `false`.
 *
 * @example Browser usage through a CDN
 * ```html
 * <script type="module">
 *   import isChar from "https://cdn.jsdelivr.net/npm/is-char@1.1.10/index.js";
 *
 *   const value = document.querySelector("input").value;
 *   console.log(isChar(value));
 * </script>
 * ```
 *
 * @example Basic validation
 * ```ts
 * import isChar from "jsr:@arvid/is-char";
 *
 * isChar("a"); // true
 * isChar("ab"); // false
 * isChar(1); // false
 * isChar(null); // false
 * ```
 *
 * @example Matching a specific code unit
 * ```ts
 * isChar("-", { is: "-" }); // true
 * isChar("/", { is: "-" }); // false
 * isChar("-", { is: "--" }); // false
 * ```
 *
 * @example Handling composed text and emoji
 * ```ts
 * isChar("é"); // true
 * isChar("e\\u0301"); // false
 * isChar("😀"); // false
 * isChar("♥"); // true
 * ```
 *
 * @example Validating unknown input in TypeScript
 * ```ts
 * const input: unknown = getInput();
 *
 * if (isChar(input)) {
 *   // `input` remains unknown by design. The function validates and returns
 *   // a boolean, but it is not a type predicate.
 *   console.log(input);
 * }
 * ```
 *
 * @example Filtering values
 * ```ts
 * const values: unknown[] = ["a", "ok", "", 7, "b"];
 * const chars = values.filter(isChar);
 * // ["a", "b"]
 * ```
 */
export default function isChar(value: unknown, options?: IsCharOptions): boolean;
