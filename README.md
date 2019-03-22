# ts-publisher

It helps to publish your TypeScript libraries to npm.

## Features
- compiles your TypeScript code into `outDir` which you defined in `tsconfig.json`.
- changes permissions of binary files
- copy package.json into `outDir` and remove `private` flag
- copy README.md into `outDir`
- publish your built file to npm

## How to install

```sh
$ npm install -D ts-publisher
// or 
$ yarn add -D ts-publisher
```

## Build

```sh
$ npx tsp build
// or
$ yarn tsp build
```

### Options

|name|description|
|---|---|
|-p, --project|specify tsconfig path. The default is \<your library>/tsconfig.json|

## Publish

```
$ npx tsp publish
// or
$ yarn tsp publish
```

### Options

|name|description|
|---|---|
|-p, --project|same as build|
|-o, --otp|one time password|
