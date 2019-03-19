import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

import * as rimraf from 'rimraf';

import { projectPath, modulePath, getOutDirPath } from './util';

const files = ['./README.md'];

export const build = (...args) => {
  const cmd = args[args.length - 1];
  const outDirPath = getOutDirPath(cmd.project);
  rimraf.sync(outDirPath);

  const tscPath = path.resolve(modulePath, 'typescript', 'bin', 'tsc');
  try {
    execSync(`${tscPath} --project ${projectPath}`);
  } catch (e) {
    console.error(e.stdout.toString());
    throw new Error('tsc compile error');
  }

  // copy package.json
  const packageJson = require(path.resolve(projectPath, 'package.json'));
  if (!packageJson.private) {
    console.warn('private option is not set in package.json');
  }
  delete packageJson.private;
  const packagePath = path.resolve(outDirPath, 'package.json');
  const indent = (packageJson.prettier && packageJson.prettier.tabWidth) || 2;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, indent));

  // copy files
  // TODO: check package.files
  for (const file of files) {
    const filepath = path.resolve(projectPath, file);
    if (!fs.existsSync(filepath)) {
      continue;
    }
    fs.writeFileSync(path.resolve(outDirPath, file), fs.readFileSync(filepath));
  }

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
