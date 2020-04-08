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
export const version = (options, [v] = []) => {
  if (!Object.values(Options).includes(v)) {
    throw new Error('Invalid option. Option must be major, minor or patch');
  }
  const pkgpath = path.resolve(projectPath, 'package.json');
  const pkg = require(pkgpath);
  pkg.version = semver.inc(pkg.version, v);
  fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2));
  const version = `v${pkg.version}`;
  const message = options.message ?? version;
  execSync(`git commit -am "${message}"`);
  execSync(`git tag ${version} -m "${message}"`);
  console.log(`created ${version} tag`);
};
