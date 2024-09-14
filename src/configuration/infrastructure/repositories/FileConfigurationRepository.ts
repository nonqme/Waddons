import fs from 'node:fs/promises';
import path from 'node:path';

import type { Configuration } from '../../domain/entities/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/ConfigurationRepository.js';
import { ConfigurationDTO } from '../../application/dtos/ConfigurationDTO.js';

export class FileConfigurationRepository implements IConfigurationRepository {
  #configPath: string = path.resolve('config.json');

  async create(configuration: Configuration): Promise<void> {
    await fs.writeFile(this.#configPath, JSON.stringify(configuration, null, 2));
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.#configPath);
      return true;
    } catch {
      return false;
    }
  }

  async load(): Promise<ConfigurationDTO> {
    const configuration = await fs.readFile(this.#configPath, 'utf-8');
    return JSON.parse(configuration);
  }
}
