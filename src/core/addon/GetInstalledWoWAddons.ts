import type { IWoWAddonRepository } from './models/IWoWAddonRepository.js';
import type { WoWAddon } from './models/WoWAddon.js';

export class GetInstalledWoWAddons {
  #repository: IWoWAddonRepository;
  constructor(repository: IWoWAddonRepository) {
    this.#repository = repository;
  }
  async execute(): Promise<WoWAddon[]> {
    return this.#repository.getAddons();
  }
}
