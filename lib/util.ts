import * as fs from 'fs';
import * as path from 'path';

export const projectPath = ['../..', '../../..']
  .map(p => path.resolve(__dirname, p))
  .find(p => fs.existsSync(path.resolve(p, 'package.json')));
export const modulePath = path.resolve(projectPath, 'node_modules');
