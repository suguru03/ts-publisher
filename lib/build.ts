import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

import { projectPath, modulePath, getOutDirPath } from './util';

export const build = (...args) => {
  const cmd = args[args.length - 1];
  const tscPath = path.resolve(modulePath, 'typescript', 'bin', 'tsc');
  execSync(`${tscPath} --project ${projectPath}`).toString();

  // update bin files
  const outDirPath = getOutDirPath(cmd.project);
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
