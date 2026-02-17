// @ts-self-types="./index.d.ts"

/**
 * Check whether a value is a single-character string.
 *
 * When `options.is` is provided, the value must also match that character.
 *
 * @example Basic validation
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * isChar("x"); // true
 * isChar("xy"); // false
 * isChar(7); // false
 * ```
 *
 * @example Require a specific character
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * isChar("y", { is: "y" }); // true
 * isChar("y", { is: "n" }); // false
 * ```
 *
 * @example Filter user input to single characters
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * const raw = ["a", "ok", "b", "", "9"];
 * const singleChars = raw.filter((value) => isChar(value));
 * // ["a", "b", "9"]
 * ```
 *
 * @example Guard logic in a parser
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * function parseFlag(value) {
 *   if (!isChar(value, { is: "-" })) return "not-a-flag";
 *   return "flag";
 * }
 * ```
 *
 * @example Validate delimiters from config
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * function getDelimiter(config) {
 *   return isChar(config.delimiter) ? config.delimiter : ",";
 * }
 * ```
 *
 * @example Reject multi-code-unit characters
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * isChar("é"); // true
 * isChar("😀"); // false
 * ```
 *
 * @example Ignore invalid `is` values
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * isChar("a", { is: "ab" }); // false
 * isChar("a", { is: "" }); // false
 * ```
 *
 * @example Keep punctuation tokens only
 * ```js
 * import isChar from "@arvid/is-char";
 *
 * const tokens = ["?", "..", "!", "ok", ","];
 * const punctuation = tokens.filter((token) =>
 *   isChar(token) && /[!?.,]/.test(token)
 * );
 * // ["?", "!", ","]
 * ```
 *
 * @param {unknown} value The value to validate.
 * @param {{ is?: string }} [options] Optional matching constraint.
 * @returns {boolean} `true` when the value is exactly one character.
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
