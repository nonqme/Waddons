import type { WoWAddon } from './WoWAddon.js';
export interface IWoWAddonApi {
  fetchAddon(id: number): Promise<WoWAddon>;
}
