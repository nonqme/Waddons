import type { WoWAddon } from './WoWAddon.js';
export interface IWoWAddonRepository {
  saveAddon(addon: WoWAddon): Promise<void>;
  addonExists(id: number, path: string): Promise<boolean>;
}
