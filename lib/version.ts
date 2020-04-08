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
export const version = (options, [version] = []) => {
  if (!Object.values(Options).includes(version)) {
    throw new Error('Invalid option. Option must be major, minor or patch');
  }
  const pkgpath = path.resolve(projectPath, 'package.json');
  const pkg = require(pkgpath);
  pkg.version = semver.inc(pkg.version, version);
  fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2));
  const message = options.message ?? `v${pkg.version}`;
  execSync(`git commit -am "${message}"`);
  execSync(`git tag ${pkg.version} -m "${message}"`);
  console.log(`created v${pkg.version} tag`);
};
