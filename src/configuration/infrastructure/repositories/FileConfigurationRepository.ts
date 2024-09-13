import fs from 'node:fs/promises';
import path from 'node:path';

import type { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/ConfigurationRepository.js';

export class FileConfigurationRepository implements IConfigurationRepository {
  #configPath: string = path.resolve('config.json');

  async create(configuration: Configuration): Promise<Configuration> {
    console.log(this.#configPath);
    await fs.writeFile(this.#configPath, JSON.stringify(configuration, null, 2));
    return configuration;
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.#configPath);
      return true;
    } catch {
      return false;
    }
  }
}
