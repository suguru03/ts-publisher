# ts-publisher

It helps to publish your TypeScript libraries to npm.

# How to install

```sh
$ npm install -D ts-publisher
// or 
$ yarn add -D ts-publisher
```

# Build

## Features
- compiles your TypeScript code into `outDir` which you defined in `tsconfig.json`.
- changes permissions of binary files
- copy package.json into `outDir` and remove `private` flag
- copy README.md into `outDir`

```sh
$ npx tsp build
// or
$ yarn tsp build
```
