#!/usr/bin/env node

import sade from 'sade';

import { install } from '../src/commands/install.js';
import { uninstall } from '../src/commands/uninstall.js';

const prog = sade('waddons');

prog.version('1.0.5');

prog
  .command('install <id>')
  .describe('install a World of Warcraft addon by id')
  .option('-p, --path', 'path to install the addon')
  .example('install 123456')
  .example('install 123456 --path /path/to/addons')
  .action(async (id, opts) => {
    await install(parseInt(id), opts.path);
  });

prog
  .command('uninstall')
  .describe('uninstall a World of Warcraft addon')
  .action(async () => {
    await uninstall();
  });

prog.parse(process.argv);
