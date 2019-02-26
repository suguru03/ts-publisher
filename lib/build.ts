import * as path from 'path';

import { projectPath, modulePath } from './util';

export const build = () => {
  // TODO: add option to specify tsconfig
  const { compilerOptions } = require(path.resolve(projectPath, 'tsconfig.json'));
  const { outDir = '' } = compilerOptions || {};
  if (!outDir) {
    throw new Error('Need to define outDir');
  }
  // TODO: delete outDir
  const tscpath = path.resolve(modulePath, 'typescript', 'lib', 'tsc');
  // TODO: switch to VM?
  process.argv.splice(2, 1);
  require(tscpath);
};
