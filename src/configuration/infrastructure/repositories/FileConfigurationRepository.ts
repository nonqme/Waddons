import fs from 'node:fs/promises';
import path from 'node:path';

import type { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/ConfigurationRepository.js';
import { ERROR_MESSAGES } from '../../errors.js';

export class FileConfigurationRepository implements IConfigurationRepository {
  #configPath: string = path.resolve('config.json');

  async create(configuration: Configuration): Promise<Configuration> {
    const configExist = await this.#exist();
    if (configExist) {
      throw new Error(ERROR_MESSAGES.configurationAlreadyExists);
    }
    await fs.writeFile(this.#configPath, JSON.stringify(configuration, null, 2));
    return configuration;
  }

  async #exist(): Promise<boolean> {
    try {
      await fs.access(this.#configPath);
      return true;
    } catch {
      return false;
    }
  }

  async load(): Promise<Configuration> {
    const configExist = await this.#exist();
    if (!configExist) {
      throw new Error(ERROR_MESSAGES.configurationDoesNotExist);
    }
    const configuration = await fs.readFile(this.#configPath, 'utf-8');
    return JSON.parse(configuration);
  }
}
