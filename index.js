// @ts-self-types="./index.d.ts"

/**
 * Check whether a value is exactly one JavaScript UTF-16 code unit.
 *
 * A value passes only when it is a primitive string and `value.length === 1`.
 * JavaScript string length counts UTF-16 code units, not Unicode code points
 * or user-perceived grapheme clusters.
 *
 * This means `"é"` passes, while `"e\\u0301"` and `"😀"` fail. The first
 * contains two UTF-16 code units despite looking like one displayed character;
 * the second is one Unicode code point represented by two UTF-16 code units.
 * A single-code-unit symbol such as `"♥"` passes regardless of its rendering.
 *
 * The rule is deliberate and narrow. Use a Unicode code-point or grapheme
 * library when those are the required semantics. This function does not
 * coerce, trim, normalize, or transform its input.
 *
 * When `options.is` is provided, the value must also match that code unit.
 *
 * @example Basic validation
 * ```js
 * import isChar from "is-char";
 *
 * isChar("x"); // true
 * isChar("xy"); // false
 * isChar(7); // false
 * ```
 *
 * @example Require a specific character
 * ```js
 * import isChar from "is-char";
 *
 * isChar("y", { is: "y" }); // true
 * isChar("y", { is: "n" }); // false
 * ```
 *
 * @example Filter user input to single characters
 * ```js
 * import isChar from "is-char";
 *
 * const raw = ["a", "ok", "b", "", "9"];
 * const singleChars = raw.filter((value) => isChar(value));
 * // ["a", "b", "9"]
 * ```
 *
 * @example Guard logic in a parser
 * ```js
 * import isChar from "is-char";
 *
 * function parseFlag(value) {
 *   if (!isChar(value, { is: "-" })) return "not-a-flag";
 *   return "flag";
 * }
 * ```
 *
 * @example Validate delimiters from config
 * ```js
 * import isChar from "is-char";
 *
 * function getDelimiter(config) {
 *   return isChar(config.delimiter) ? config.delimiter : ",";
 * }
 * ```
 *
 * @example Reject multi-code-unit characters
 * ```js
 * import isChar from "is-char";
 *
 * isChar("é"); // true
 * isChar("😀"); // false
 * ```
 *
 * @example Ignore invalid `is` values
 * ```js
 * import isChar from "is-char";
 *
 * isChar("a", { is: "ab" }); // false
 * isChar("a", { is: "" }); // false
 * ```
 *
 * @example Keep punctuation tokens only
 * ```js
 * import isChar from "is-char";
 *
 * const tokens = ["?", "..", "!", "ok", ","];
 * const punctuation = tokens.filter((token) =>
 *   isChar(token) && /[!?.,]/.test(token)
 * );
 * // ["?", "!", ","]
 * ```
 *
 * @param {unknown} value The value to validate. Non-string values return `false`.
 * @param {{ is?: string }} [options] Optional matching constraint. When
 * `options.is` is defined, it must have exactly one UTF-16 code unit and equal
 * the value. Invalid runtime values return `false`.
 * @returns {boolean} `true` when the value satisfies the UTF-16 code-unit rule
 * and the optional matching constraint; otherwise `false`.
 */
export default function isChar(value, options) {
  if (typeof value !== "string" || value.length !== 1) {
    return false;
  }

  const expected = options?.is;
  if (expected === undefined) {
    return true;
  }

  return typeof expected === "string" && expected.length === 1 && value === expected;
}
