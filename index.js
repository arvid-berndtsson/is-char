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
