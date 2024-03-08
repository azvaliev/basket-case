# Cold Case

![Documentation](https://img.shields.io/badge/documentation-typedoc-blue?link=https%3A%2F%2Fazvaliev.github.io%2Fcold-case%2F)
![NPM License](https://img.shields.io/npm/l/cold-case)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/azvaliev/cold-case/.github%2Fworkflows%2Flint-test.yml?label=tests)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/cold-case)
![NPM Version](https://img.shields.io/npm/v/cold-case)

Simple util library for converting to and from various cases, **with exceptionally strong typing**.
All conversion functions & types have 95%+ test coverage. [Reference documentation](https://azvaliev.github.io/cold-case/)

```typescript
import { snakeToCamelCase } from 'cold-case';

const camelCased = snakeToCamelCase({ created_at: new Date(), updated_at: null, camelCasedProp: 'string' });
//    ^?  { createdAt: Date, updatedAt: Date | null, camelCasedProp: string }
```

Supports converting to and from
- snake_case
- camelCase
- PascalCase

## Installation

```bash
npm install cold-case
```

## Usage

All the functions having a naming convention of `<from-casing>To<to-casing>Case` using camelCase.
`from-casing` or `to-casing` is one of three possible values.

- `snake`
- `camel`
- `pascal`

They can either take an object or a string. If an object is passed in, casing will be converted for all property names.
If a string is passed in, the casing is converted for the string directly.

See [reference docs](https://azvaliev.github.io/cold-case/) for details

```typescript
import * as casing from 'cold-case';

casing.snakeToPascalCase('change_me'); // changeMe
casing.pascalToCamelCase('StronglyTypedConversion'); // stronglyTypedConversion
casing.camelToSnakeCase({ createdAt: new Date(), updatedAt: null, already_snake_cased: 'string' });
// ^? { created_at: Date, updated_at: Date | null, already_snake_cased: string }
```
