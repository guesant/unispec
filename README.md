# unispec

[![CI](https://github.com/guesant/unispec/actions/workflows/ci.yml/badge.svg)](https://github.com/guesant/unispec/actions/workflows/ci.yml)

> Specify once, reuse it everywhere.

The objective of **Uni**fied **Spec**ification is to provide the simplest way to declare, deploy and integrate every action of your project and make it easier to work with OpenAPI/Swagger, GraphQl, NestJS, C#/DotNet and the maximum platforms available.

Unispec not the first and not the last project that tries to do this purpose, and probably doesn't fit your needs.

## Ecosystem

| Project                     | Badges                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@unispec/ast-builder`      | [![Static Badge](https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=git)](https://github.com/guesant/unispec/tree/next/packages/ast/integrations/npm/builder) [![NPM Version](https://img.shields.io/npm/v/%40unispec%2Fast-builder?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40unispec%2Fast-builder)](https://www.npmjs.com/package/@unispec/ast-builder)    |
| `@unispec/ast-types`        | [![Static Badge](https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=git)](https://github.com/guesant/unispec/tree/next/packages/ast/integrations/npm/types) [![NPM Version](https://img.shields.io/npm/v/%40unispec%2Fast-types?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40unispec%2Fast-types)](https://www.npmjs.com/package/@unispec/ast-types)            |
| `@unispec/ast-utils`        | [![Static Badge](https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=git)](https://github.com/guesant/unispec/tree/next/packages/ast/integrations/npm/utils) [![NPM Version](https://img.shields.io/npm/v/%40unispec%2Fast-utils?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40unispec%2Fast-utils)](https://www.npmjs.com/package/@unispec/ast-utils)            |
| `@unispec/driver-nestjs`    | [![Static Badge](https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=git)](https://github.com/guesant/unispec/tree/next/packages/driver-nestjs) [![NPM Version](https://img.shields.io/npm/v/%40unispec%2Fdriver-nestjs?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40unispec%2Fdriver-nestjs)](https://www.npmjs.com/package/@unispec/driver-nestjs)             |
| `@unispec/driver-quicktype` | [![Static Badge](https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=git)](https://github.com/guesant/unispec/tree/next/packages/driver-quicktype) [![NPM Version](https://img.shields.io/npm/v/%40unispec%2Fdriver-quicktype?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40unispec%2Fdriver-quicktype)](https://www.npmjs.com/package/@unispec/driver-quicktype) |

## Deprecated

| `@unispec/core` | [![Static Badge](https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=git)](https://github.com/guesant/unispec/tree/next/packages/core) [![NPM Version](https://img.shields.io/npm/v/%40unispec%2Fcore?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40unispec%2Fcore)](https://www.npmjs.com/package/@unispec/core) |
| `@unispec/compiler` | [![Static Badge](https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=git)](https://github.com/guesant/unispec/tree/next/packages/compiler) [![NPM Version](https://img.shields.io/npm/v/%40unispec%2Fcompiler?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40unispec%2Fcompiler)](https://www.npmjs.com/package/@unispec/compiler) |

Before we talk about this project, thanks to the following comunities arround these inspiring projects unispec is possible:

- TypeBox - <https://github.com/sinclairzx81/typebox>
- TypeBox - Codegen - <https://github.com/sinclairzx81/typebox-codegen>
- Typia - <https://github.com/sinclairzx81/typebox#reference-types>
- QuickType - <https://github.com/glideapps/quicktype>
- JsonTypeDef - <https://jsontypedef.com/docs/>
- JsonSchema - <https://json-schema.org/>
- AJV - <https://ajv.js.org/>
- HeyApi OpenApi Typescript - <https://github.com/hey-api/openapi-ts>
- Nx - <https://nx.dev/>
- UnJS - <https://unjs.io/>
- magicast - <https://unjs.io/packages/magicast>
- recast - <https://github.com/benjamn/recast>
- ast-types - <https://github.com/benjamn/ast-types>
- Corvus.JsonSchema - <https://github.com/corvus-dotnet/Corvus.JsonSchema>
- JsonEverything - <https://github.com/gregsdennis/json-everything>
- typespec - <https://github.com/microsoft/typespec>
