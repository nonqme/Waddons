import type { Addon } from '../models/Addon.js';

export interface IAddonGateway {
  search(name: string): Promise<Array<Addon>>;
}
