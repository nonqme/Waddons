import type * as Fs from 'node:fs/promises';
import Path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { IWoWAddonRepository } from '../models/IWoWAddonRepository.js';
import type { WoWAddon } from '../models/WoWAddon.js';

export class WoWAddonRepository implements IWoWAddonRepository {
  #fs: typeof Fs;
  constructor(fs: typeof Fs) {
    this.#fs = fs;
  }
  async saveAddon(addon: WoWAddon): Promise<void> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = Path.dirname(__filename);
    const installedAddonsPath = Path.join(__dirname, '..', '..', '..', '..', '..', 'configs', 'addons.json');

    try {
      const installedAddons = await this.#fs.readFile(installedAddonsPath, 'utf-8');
      const addons = JSON.parse(installedAddons);
      addons.push(addon);
      await this.#fs.writeFile(installedAddonsPath, JSON.stringify(addons, null, 2));
    } catch {
      await this.#fs.mkdir(Path.join(__dirname, '..', '..', '..', '..', '..', 'configs'), { recursive: true });
      await this.#fs.writeFile(installedAddonsPath, JSON.stringify([addon], null, 2));
    }
  }
  async exists(id: number, path: string): Promise<boolean> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = Path.dirname(__filename);
    const installedAddonsPath = Path.join(__dirname, '..', '..', '..', '..', '..', 'configs', 'addons.json');

    try {
      const installedAddons = await this.#fs.readFile(installedAddonsPath, 'utf-8');
      const addons = JSON.parse(installedAddons);
      return addons.some((addon: WoWAddon) => addon.id === id && addon.path === path);
    } catch {
      return false;
    }
  }
}
