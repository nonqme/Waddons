import Path from 'node:path';

import type { IWoWAddonRepository } from './models/IWoWAddonRepository.js';
import type { Delete } from '../shared/delete.js';

export class UninstallWoWAddon {
  #repository: IWoWAddonRepository;
  #deleteFn: Delete;
  constructor(repository: IWoWAddonRepository, deleteFn: Delete) {
    this.#repository = repository;
    this.#deleteFn = deleteFn;
  }
  async execute(id: number, path: string): Promise<void> {
    const exists = await this.#repository.addonExists(id, path);
    if (!exists) {
      throw new Error('Addon does not exist');
    }
    const addonData = await this.#repository.getAddonData(id, path);
    for (const fileModule of addonData.fileModules) {
      const filePath = Path.join(path, fileModule);
      await this.#deleteFn(filePath);
    }

    await this.#repository.deleteAddon(id, path);
  }
}
