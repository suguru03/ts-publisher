import * as fs from 'fs';
import * as path from 'path';

export function getExecPath() {
  // npm_execpath doesn't exist when npx is used
  return process.env.npm_execpath || 'npm';
}

export const projectPath = ['../..', '../../..']
  .map((p) => path.resolve(__dirname, p))
  .find((p) => fs.existsSync(path.resolve(p, 'package.json')));

export const modulePath = path.resolve(projectPath, 'node_modules');

export function getTsconfigPath(configPath: unknown) {
  return path.resolve(projectPath, typeof configPath === 'string' ? configPath : 'tsconfig.json');
}

export function getOutDirPath(configPath: unknown) {
  const tsconfigPath = getTsconfigPath(configPath);
  const { extends: extendsPath, compilerOptions } = require(tsconfigPath);
  const { outDir = '' } = compilerOptions || {};
  if (!outDir) {
    if (extendsPath) {
      return getOutDirPath(extendsPath);
    }
    throw new Error('Need to define outDir');
  }
  return path.resolve(projectPath, outDir);
}
