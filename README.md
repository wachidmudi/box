# Pandora Apps

This monorepo contains projects that i've build in the past. 😁

## Using this monorepo

This monorepo created with Turborepo, by run the following command:

```sh
npx create-turbo@latest
```

### Create new app or package

Run the following command:
```sh
yarn turbo gen workspace
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `fancy-todo-client`: Fancy Todo, an SPA build with jQuery, Bootstrap css & TypeScript ([see](https://github.com/REPO/apps/fancy-todo-client/README.md))
- `fancy-todo-server`: Fancy Todo, an API Server build with Express, Sequelize, Postgres & TypeScript ([see](https://github.com/REPO/apps/fancy-todo-server/README.md))
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn dev
```

### Tested Environment
```
Operating System:
  Platform: darwin
  Arch: arm64
  Version: Darwin Kernel Version 23.2.0: Wed Nov 15 21:59:33 PST 2023; root:xnu-10002.61.3~2/RELEASE_ARM64_T8112 arm64
Binaries:
  Node: 20.10.0
  npm: 10.2.3
  Yarn: 1.22.21
```

## References
- [boilerplate-express-typescript-sequelize](https://github.com/RobbeCl/boilerplate-express-typescript-sequelize)
