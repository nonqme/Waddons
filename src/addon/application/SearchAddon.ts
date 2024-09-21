import type { Addon } from '../domain/models/Addon.js';
import type { IAddonGateway } from '../domain/gateways/IAddonGateway.js';

export class SearchAddon {
  #addonGateway: IAddonGateway;
  constructor(addonGateway: IAddonGateway) {
    this.#addonGateway = addonGateway;
  }
  async execute(name: string): Promise<Array<Addon>> {
    return this.#addonGateway.search(name);
  }
}
