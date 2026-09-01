# is-char

[![CI](https://github.com/arvid-berndtsson/is-char/actions/workflows/ci.yml/badge.svg)](https://github.com/arvid-berndtsson/is-char/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/is-char)](https://www.npmjs.com/package/is-char)
[![npm downloads](https://img.shields.io/npm/dm/is-char)](https://www.npmjs.com/package/is-char)
[![JSR](https://jsr.io/badges/@arvid/is-char)](https://jsr.io/@arvid/is-char)
[![License](https://img.shields.io/npm/l/is-char)](https://github.com/arvid-berndtsson/is-char/blob/main/LICENSE)
[![Node.js >=18](https://img.shields.io/badge/node-%3E%3D18-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

`is-char` is a focused utility for one job: checking whether a value is exactly one JavaScript UTF-16 code unit.

In many codebases, this check appears in validators, parsers, CLIs, text filters, and protocol handlers. Keeping it in a dedicated package makes that intent explicit and reusable across projects.

## Why this package matters

- It standardizes a common validation rule used in input boundaries.
- It removes repeated ad-hoc checks from application code.
- It keeps behavior consistent across services and libraries.
- It is minimal, dependency-free, and safe to use in performance-sensitive paths.

## Install

### npm

```bash
npm i is-char
```

### JSR

```bash
npx jsr add @arvid/is-char
```

## Usage

```js
import isChar from "is-char";

isChar("a"); // true
isChar("ab"); // false
isChar(""); // false
isChar(1); // false
isChar("a", { is: "a" }); // true
isChar("a", { is: "b" }); // false
```

## API

### `isChar(value)`

Returns `true` when:

- `value` is a string
- `value.length === 1`

Otherwise returns `false`.

### `isChar(value, { is })`

If `is` is provided, `isChar` returns `true` only when:

- `value` is a single UTF-16 code unit string
- `is` is a single UTF-16 code unit string
- `value === is`

An omitted `is` value, or `is: undefined`, applies no matching constraint. Other invalid `is` values return `false`.

## Character semantics

`is-char` deliberately uses JavaScript's simple string-length rule:

```js
typeof value === "string" && value.length === 1
```

In this package, a char means exactly one UTF-16 code unit. This is not the same as a Unicode code point or a user-perceived grapheme cluster.

| Input | UTF-16 code units | Result |
| --- | ---: | --- |
| `"a"` | 1 | `true` |
| `"é"` | 1 | `true` |
| `"e\\u0301"` | 2 | `false` |
| `"😀"` | 2 | `false` |
| `"ab"` | 2 | `false` |

`"e\\u0301"` contains the letter `e` followed by a combining acute accent. It may be displayed as one user-perceived character, but it contains two UTF-16 code units, so this package returns `false`.

Astral characters and multi-code-unit sequences, including many emoji, return `false`. Single-code-unit symbols such as `"♥"` return `true`.

This package does not normalize strings, combine grapheme clusters, identify emoji, or coerce non-string values.

## JSR and Deno

For npm, Node.js, and bundlers:

```js
import isChar from "is-char";
```

For Deno through JSR:

```ts
import isChar from "jsr:@arvid/is-char";
```

## TypeScript

```ts
import isChar from "is-char";

const value: unknown = "x";

if (isChar(value)) {
  console.log(`Single UTF-16 code unit: ${value}`);
}
```

Type definitions are included out of the box.
