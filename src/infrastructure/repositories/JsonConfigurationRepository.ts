import type fs from 'node:fs/promises';

import type { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/IConfigurationRepository.js';

export class JsonConfigurationRepository implements IConfigurationRepository {
  #fileSystem: typeof fs;
  #path: string = 'configuration.json';
  constructor(fileSystem: typeof fs) {
    this.#fileSystem = fileSystem;
  }

  async create(configuration: Configuration): Promise<Configuration> {
    await this.#fileSystem.writeFile(this.#path, JSON.stringify(configuration));
    return configuration;
  }

  async exists(): Promise<boolean> {
    try {
      await this.#fileSystem.access(this.#path);
      return true;
    } catch {
      return false;
    }
  }
}
