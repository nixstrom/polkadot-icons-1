# Polkadot Icons website

This is a static website, where data and copy is either stored and consumed as JSON or hardcoded directly.

It is built with:

- **[React](https://reactjs.org/)**  
  JavaScript framework for building user interfaces for the web. It is reactive, declarative and very approachable to build and extend.
- **[Next.js](https://nextjs.org/)**  
  Application framework built on top of React. Includes routing, a build system supporting code splitting and other nice optimisations.
- **[CSS Modules](https://github.com/css-modules/css-modules)**  
  Modular (and component scoped) way to write CSS (simpler to use when the styles are not dependent on props).
- **[TypeScript](https://www.typescriptlang.org/)**  
  Adds types for development and compiles to JavaScript. This acts as an accelerator during development, and prevents most type errors at write-time and compile-time.
- **[pnpm](https://pnpm.io/)**  
  A fast, secury and simple package manager.

<br />

## Getting started

### Install dependencies

To install packages, simply run:

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

The application will now start on [http://localhost:3001](http://localhost:3001), and will refresh on any change you make (hot module reloading).

<br />

## Deploying to production

Depending on the host, the setup might vary – some hosts will detect that it is a Next.js app and handle the rest for you. That said, there are two important commands to know.

- `pnpm build`  
  Creates a production-ready build. Remember to first run `pnpm install`.
- `pnpm start`  
  This will start a Node.js server. In the current iteration of this website, this should not be necesarry as it is completely static.

<br />

## Code quality

We are using a few tools to keep quality in check.

- **[ESLint](https://eslint.org/)**  
  Static code analysis to enforce certain patterns and idiomatic programming. It is strongly recommended to install this as a plugin in your IDE, so you get warnings and errors "live", although you can also run it manually with `pnpm lint`.

- **[Prettier](https://prettier.io/)**  
  Opinionated code formatter to make sure our code follows the same uniform style. It is strongly recommended to install this as a plugin in your IDE, so the code is automatically formatted on save. Can also be run manually with `pnpm prettier`.

- **[Typescript](https://www.typescriptlang.org/)**  
  Adding strict type checking to the source code, allows us to avoid silly bugs and to rewrite code with confidence. Some IDE's have native support for Typescript, but if not it is strongly recommended that you install relevant plugins. You can also run it manually with `pnpm typecheck`.

<br />
