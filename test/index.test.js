import assert from "node:assert/strict";
import test from "node:test";
import isChar from "../index.js";

test("accepts exactly one UTF-16 code unit string", () => {
  assert.equal(isChar("a"), true);
  assert.equal(isChar("é"), true);
});

test("rejects non-strings, empty strings, and longer strings", () => {
  for (const value of ["", "ab", 1, null, undefined, {}, [], true, Symbol("a")]) {
    assert.equal(isChar(value), false);
  }
});

test("does not coerce boxed strings", () => {
  assert.equal(isChar(new String("a")), false);
});

test("rejects surrogate pairs and combining sequences", () => {
  assert.equal(isChar("😀"), false);
  assert.equal(isChar("e\u0301"), false);
  assert.equal(isChar("♥"), true);
  assert.equal(isChar("\uD800"), true);
  assert.equal(isChar("\u0000"), true);
});

test("matches an optional expected code unit", () => {
  assert.equal(isChar("a", { is: "a" }), true);
  assert.equal(isChar("a", { is: "b" }), false);
  assert.equal(isChar("a", { is: "ab" }), false);
  assert.equal(isChar("a", { is: "" }), false);
});

test("treats an undefined expected value as no constraint", () => {
  assert.equal(isChar("a", { is: undefined }), true);
  assert.equal(isChar("a", {}), true);
  assert.equal(isChar("a", undefined), true);
  assert.equal(isChar("a", null), true);
});

test("accepts whitespace and punctuation", () => {
  assert.equal(isChar(" "), true);
  assert.equal(isChar("!", { is: "!" }), true);
});
