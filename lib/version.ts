import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

import * as semver from 'semver';

import { projectPath } from './util';

enum Options {
  Major = 'major',
  Minor = 'minor',
  Patch = 'patch',
}
export const version = (...args: any[]) => {
  const [option] = args.pop() ?? [];
  if (!Object.values(Options).includes(option)) {
    throw new Error('Invalid option. Option must be major, minor or patch');
  }
  const pkgpath = path.resolve(projectPath, 'package.json');
  const pkg = require(pkgpath);
  pkg.version = semver.inc(pkg.version, option);
  fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2));
  execSync(`git commit -am "v${pkg.version}"`);
};
