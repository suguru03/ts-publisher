#!/usr/bin/env node

import * as program from 'commander';

import { build, publish } from '../lib';

const pkg = require('../package.json');

program.version(pkg.version);

program
  .command('build')
  .description('build typescript files')
  .option('-p, --project [value]', 'Project file path')
  .action(build);

program
  .command('publish')
  .description('publish package to npm')
  .option('-p, --project [value]', 'Project file path')
  .option('-o, --otp [integer]', 'otpcode')
  .action(publish);

program.parse(process.argv);
