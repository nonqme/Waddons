import type { IWoWAddonRepository } from './models/IWoWAddonRepository';
import type { WoWAddon } from './models/WoWAddon';

export class GetInstalledWoWAddons {
  #repository: IWoWAddonRepository;
  constructor(repository: IWoWAddonRepository) {
    this.#repository = repository;
  }
  async execute(): Promise<WoWAddon[]> {
    return this.#repository.getAddons();
  }
}
