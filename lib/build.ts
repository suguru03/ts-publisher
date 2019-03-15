import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

import { projectPath, modulePath } from './util';

export const build = () => {
  // TODO: add option to specify tsconfig
  const { compilerOptions } = require(path.resolve(projectPath, 'tsconfig.json'));
  const { outDir = '' } = compilerOptions || {};
  if (!outDir) {
    throw new Error('Need to define outDir');
  }
  // TODO: delete outDir
  const outDirPath = path.resolve(projectPath, outDir);

  const tscpath = path.resolve(modulePath, 'typescript', 'lib', 'tsc');
  // TODO: switch to VM?
  process.argv.splice(2, 1);
  require(tscpath);

  // update bin files
  const binpath = path.join(outDirPath, 'bin');
  if (fs.existsSync(binpath) && fs.statSync(binpath).isDirectory()) {
    for (const file of fs.readdirSync(binpath)) {
      const filepath = path.join(binpath, file);
      if (/.js$/.test(file)) {
        execSync(`chmod 755 ${filepath}`);
      }
    }
  }
};
