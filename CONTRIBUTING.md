# Contributing

## Development

The package requires Node.js 18 or later.

```bash
npm ci
npm run check
npm test
```

The test suite uses Node's built-in test runner. Keep the package focused on
validating whether a value is exactly one JavaScript UTF-16 code unit.

## Changes

When changing behavior, update the implementation, TypeScript declarations,
README examples, and tests together. Preserve the documented behavior for
non-string values and avoid coercion.

## Releases

Releases are published through the GitHub Actions `Publish` workflow. Do not
publish manually from a local machine. The workflow keeps package versions,
Git tags, npm, and JSR synchronized.

## Pull requests

Explain the behavior being changed and include the validation commands you
ran. Keep unrelated changes out of the pull request.
