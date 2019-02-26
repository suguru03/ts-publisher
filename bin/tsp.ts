#!/usr/bin/env node

import * as program from 'commander';

import { build, publish } from '../lib';

const pkg = require('../package.json');

program.version(pkg.version);

program
  .command('build')
  .description('build typescript files')
  .action(build);

program
  .command('publish')
  .description('publish package to npm')
  .action(publish);

program.parse(process.argv);
