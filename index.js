// @ts-self-types="./index.d.ts"

/**
 * Check whether a value is a single-character string.
 *
 * When `options.is` is provided, the value must also match that character.
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
