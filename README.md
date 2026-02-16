# is-char

Tiny package that checks if a value is exactly one character long.

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

TypeScript works out of the box:

```ts
import isChar = require("is-char");
```
