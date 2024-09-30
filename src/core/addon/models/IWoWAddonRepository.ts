import type { WoWAddon } from './WoWAddon.js';
export interface IWoWAddonRepository {
  saveAddon(addon: WoWAddon): Promise<void>;
  addonExists(id: number, path: string): Promise<boolean>;
  getAddonData(id: number, path: string): Promise<WoWAddon>;
  deleteAddon(id: number, path: string): Promise<void>;
  getAddons(): Promise<WoWAddon[]>;
}
