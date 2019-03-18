import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

import { projectPath, modulePath } from './util';

export const build = () => {
  // TODO: add option to specify tsconfig
  const tsconfigPath = path.resolve(projectPath, 'tsconfig.json');
  const { compilerOptions } = require(tsconfigPath);
  const { outDir = '' } = compilerOptions || {};
  if (!outDir) {
    throw new Error('Need to define outDir');
  }
  const outDirPath = path.resolve(projectPath, outDir);

  const tscPath = path.resolve(modulePath, 'typescript', 'bin', 'tsc');
  execSync(`${tscPath} --project ${projectPath}`).toString();

  // update bin files
  const binpath = path.join(outDirPath, 'bin');
  if (!fs.existsSync(binpath) || !fs.statSync(binpath).isDirectory()) {
    return;
  }
  for (const file of fs.readdirSync(binpath)) {
    const filepath = path.join(binpath, file);
    if (/.js$/.test(file)) {
      execSync(`chmod 755 ${filepath}`);
    }
  }
};
