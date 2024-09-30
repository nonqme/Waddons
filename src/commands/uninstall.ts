import Fs from 'node:fs/promises';
import { select } from '@inquirer/prompts';

import { UninstallWoWAddon } from '../core/addon/UninstallWoWAddon.js';
import { GetInstalledWoWAddons } from '../core/addon/GetInstalledWoWAddons.js';
import { WoWAddonRepository } from '../core/addon/infrastructure/WoWAddonRepository.js';
import { deleteFolder } from '../core/shared/delete.js';

export const uninstall = async () => {
  const repository = new WoWAddonRepository(Fs);
  const getInstalledWoWAddons = new GetInstalledWoWAddons(repository);
  const installedAddons = await getInstalledWoWAddons.execute();
  const addon = await select({
    message: 'Select an addon to uninstall',
    choices: installedAddons.map((addon) => addon.name),
  });
  const addonData = installedAddons.find((a) => a.name === addon);
  if (!addonData) {
    throw new Error('Addon not found');
  }
  const uninstallWoWAddon = new UninstallWoWAddon(repository, deleteFolder);
  await uninstallWoWAddon.execute(addonData.id, addonData.path!);
};
