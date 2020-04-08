import * as path from 'path';
import { execSync } from 'child_process';

import * as inquirer from 'inquirer';

import { getExecPath, getOutDirPath } from './util';

export const publish = async (...args) => {
  const cmd = args[args.length - 1];
  const outDirPath = getOutDirPath(cmd.project);
  const packageJson = require(path.resolve(outDirPath, 'package.json'));
  const name = `${packageJson.name}@${packageJson.version}`;
  if (!process.env.CI) {
    const { confirmation } = await inquirer.prompt({
      name: 'confirmation',
      type: 'confirm',
      message: `name: ${name}\ntarget dir: ${outDirPath}`,
    });
    if (!confirmation) {
      process.exit(1);
    }
  }
  console.log(`publishing... ${name}`);
  execSync(`cd ${outDirPath} && ${getExecPath()} publish ${cmd.otp ? '--otp=' + cmd.otp : ''}`);
  console.log('published!');
};
