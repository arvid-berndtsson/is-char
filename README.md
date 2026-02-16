# is-char

`is-char` is a focused utility for one job: checking whether a value is a single-character string.

In many codebases, this check appears in validators, parsers, CLIs, text filters, and protocol handlers. Keeping it in a dedicated package makes that intent explicit and reusable across projects.

## Why this package matters

- It standardizes a common validation rule used in input boundaries.
- It removes repeated ad-hoc checks from application code.
- It keeps behavior consistent across services and libraries.
- It is minimal, dependency-free, and safe to use in performance-sensitive paths.

## Install

```bash
npm i is-char
```

## Usage

```js
const isChar = require("is-char");

isChar("a"); // true
isChar("ab"); // false
isChar(""); // false
isChar(1); // false
```

## API

### `isChar(value)`

Returns `true` when:

- `value` is a string
- `value.length === 1`

Otherwise returns `false`.

## Character semantics

`is-char` follows JavaScript string semantics and checks `value.length === 1` (UTF-16 code units).
This means some multi-code-unit characters (for example many emoji) return `false`.

## TypeScript

```ts
import isChar = require("is-char");
```

Type definitions are included out of the box.
