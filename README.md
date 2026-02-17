# is-char

[![npm version](https://img.shields.io/npm/v/is-char)](https://www.npmjs.com/package/is-char)
[![JSR](https://jsr.io/badges/@arvid/is-char)](https://jsr.io/@arvid/is-char)

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

`is-char` follows JavaScript string semantics and checks `value.length === 1` (UTF-16 code units).
This means some multi-code-unit characters (for example many emoji) return `false`.

## TypeScript

```ts
import isChar from "is-char";
```

Type definitions are included out of the box.
