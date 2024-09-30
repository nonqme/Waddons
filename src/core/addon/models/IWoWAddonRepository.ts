import type { WoWAddon } from './WoWAddon.js';
export interface IWoWAddonRepository {
  saveAddon(addon: WoWAddon): Promise<void>;
  exists(id: number, path: string): Promise<boolean>;
}
