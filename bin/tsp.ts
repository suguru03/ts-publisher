#!/usr/bin/env node

import * as program from 'commander';

const pkg = require('../package.json');

program.version(pkg.version);

program
  .command('build')
  .description('build typescript files')
  .action(() => console.log('build'));

program
  .command('publish')
  .description('publish package to npm')
  .action(() => console.log('publish'));

program.parse(process.argv);
