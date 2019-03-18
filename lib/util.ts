import * as fs from 'fs';
import * as path from 'path';

export const projectPath = ['../..', '../../..']
  .map(p => path.resolve(__dirname, p))
  .find(p => fs.existsSync(path.resolve(p, 'package.json')));
export const modulePath = path.resolve(projectPath, 'node_modules');

export const getOutDirPath = (configPath: unknown) => {
  const tsconfigPath = path.resolve(projectPath, typeof configPath === 'string' ? configPath : 'tsconfig.json');
  const { compilerOptions } = require(tsconfigPath);
  const { outDir = '' } = compilerOptions || {};
  if (!outDir) {
    throw new Error('Need to define outDir');
  }
  return path.resolve(projectPath, outDir);
};
