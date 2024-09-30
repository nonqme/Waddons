import type * as Fs from 'node:fs/promises';
import Path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { IWoWAddonRepository } from '../models/IWoWAddonRepository.js';
import type { WoWAddon } from '../models/WoWAddon.js';

export class WoWAddonRepository implements IWoWAddonRepository {
  #fs: typeof Fs;
  #filename: string = fileURLToPath(import.meta.url);
  #dirname: string = Path.dirname(this.#filename);
  #installedAddonsPath: string = Path.join(this.#dirname, '..', '..', '..', '..', '..', 'configs', 'addons.json');
  constructor(fs: typeof Fs) {
    this.#fs = fs;
  }
  async saveAddon(addon: WoWAddon): Promise<void> {
    try {
      const installedAddons = await this.#readFile(this.#installedAddonsPath);
      installedAddons.push(addon);
      await this.#fs.writeFile(this.#installedAddonsPath, JSON.stringify(installedAddons, null, 2));
    } catch {
      await this.#fs.mkdir(Path.join(__dirname, '..', '..', '..', '..', '..', 'configs'), { recursive: true });
      await this.#fs.writeFile(this.#installedAddonsPath, JSON.stringify([addon], null, 2));
    }
  }
  async addonExists(id: number, path: string): Promise<boolean> {
    try {
      const installedAddons = await this.#readFile(this.#installedAddonsPath);
      return installedAddons.some((addon: WoWAddon) => addon.id === id && addon.path === path);
    } catch {
      return false;
    }
  }
  async getAddonData(id: number, path: string): Promise<WoWAddon> {
    const installedAddons = await this.#readFile(this.#installedAddonsPath);
    const addon = installedAddons.find((addon: WoWAddon) => addon.id === id && addon.path === path);
    if (!addon) {
      throw new Error(`Addon with id ${id} and path ${path} not found`);
    }
    return addon;
  }

  async deleteAddon(id: number, path: string): Promise<void> {
    const installedAddons = await this.#readFile(this.#installedAddonsPath);
    const newInstalledAddons = installedAddons.filter((addon: WoWAddon) => addon.id !== id || addon.path !== path);
    await this.#fs.writeFile(this.#installedAddonsPath, JSON.stringify(newInstalledAddons, null, 2));
  }

  async getAddons(): Promise<WoWAddon[]> {
    return this.#readFile(this.#installedAddonsPath);
  }

  #readFile = async (path: string): Promise<WoWAddon[]> => {
    const installedAddons = await this.#fs.readFile(path, 'utf-8');
    const addons = JSON.parse(installedAddons);
    return addons;
  };
}
