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
  const addonName = await select({
    message: 'Select an addon to uninstall',
    choices: installedAddons.map((addon) => addon.name),
  });
  const addons = installedAddons.filter((addon) => addon.name !== addonName);
  if (addons.length === 0) {
    throw new Error(`Addon ${addonName} not found`);
  }
  const addonPath = await select({
    message: 'Select an addon to uninstall',
    choices: addons.map((addon) => addon.path!),
  });

  const addonData = installedAddons.find((addon) => addon.path === addonPath && addon.name === addonName);
  if (!addonData) {
    throw new Error(`Addon ${addonName} not found`);
  }
  const uninstallWoWAddon = new UninstallWoWAddon(repository, deleteFolder);
  await uninstallWoWAddon.execute(addonData.id, addonData.path!);
};
