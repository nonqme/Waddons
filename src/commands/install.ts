import * as Fs from 'node:fs/promises';

import 'dotenv/config.js';
import { password, input } from '@inquirer/prompts';

import { InstallWoWAddon } from '../core/addon/InstallWoWAddon.js';
import { CurseForgeApi } from '../core/addon/infrastructure/CurseForgeApi.js';
import { WoWAddonRepository } from '../core/addon/infrastructure/WoWAddonRepository.js';
import { download } from '../core/shared/download.js';
import { extract } from '../core/shared/extract.js';

export const install = async (id: number, options?: { path: string; key: string; config: string }) => {
  let path = options?.path;
  let key = process.env.API_KEY ?? options?.key;
  const config = options?.config;

  if (!id) {
    throw new Error('You must provide an addon id');
  }

  if (config) {
    const configFile = await Fs.readFile(config, 'utf-8');
    const configJson = JSON.parse(configFile);
    path = configJson.path;
    key = configJson.apiKey;
  }

  if (!path) {
    const pathResponse = await input({
      message: 'Enter the path to your World of Warcraft addons folder',
    });
    path = pathResponse;
  }

  if (!key) {
    const apiKeyResponse = await password({
      message: 'Enter your CurseForge API key',
    });
    key = apiKeyResponse;
  }

  const api = new CurseForgeApi(key, fetch);
  const repository = new WoWAddonRepository(Fs);
  const installWoWAddon = new InstallWoWAddon(api, repository, download, extract);
  await installWoWAddon.execute(id, path);
};
