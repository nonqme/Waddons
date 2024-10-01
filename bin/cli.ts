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
  .option('-k, --key', 'API key')
  .option('-c, --config', 'path to a config file')
  .example('install 123456')
  .example('install 123456 --path /path/to/addons')
  .example('install 123456 -p /path/to/addons')
  .example('install 123456 --key your-api-key')
  .example('install 123456 -k your-api-key')
  .example('install 123456 --config /path/to/config.json')
  .example('install 123456 -c /path/to/config.json')
  .action(async (id, options) => {
    await install(parseInt(id), options);
  });

prog
  .command('uninstall')
  .describe('uninstall a World of Warcraft addon')
  .action(async () => {
    await uninstall();
  });

prog.parse(process.argv);
