# is-char

[![CI](https://github.com/arvid-berndtsson/is-char/actions/workflows/ci.yml/badge.svg)](https://github.com/arvid-berndtsson/is-char/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/is-char)](https://www.npmjs.com/package/is-char)
[![npm downloads](https://img.shields.io/npm/dm/is-char)](https://www.npmjs.com/package/is-char)
[![JSR](https://jsr.io/badges/@arvid/is-char)](https://jsr.io/@arvid/is-char)
[![License](https://img.shields.io/npm/l/is-char)](https://github.com/arvid-berndtsson/is-char/blob/main/LICENSE)
[![Node.js >=18](https://img.shields.io/badge/node-%3E%3D18-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

`is-char` is a focused utility for one job: checking whether a value is a single-character string.

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

- `value` is a single-character string
- `is` is a single-character string
- `value === is`

## Character semantics

`is-char` checks whether a value contains exactly one JavaScript UTF-16 code unit by using `value.length === 1`. It does not validate Unicode code points or user-perceived grapheme clusters.

| Input | Result |
| --- | --- |
| `"a"` | `true` |
| `"é"` | `true` |
| `"😀"` | `false` |
| `"e\\u0301"` | `false` |

Emoji use multiple UTF-16 code units and therefore return `false` by design.

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
```

Type definitions are included out of the box.
