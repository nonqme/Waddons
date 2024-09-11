import { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/IConfigurationRepository.js';

export class InMemoryConfigurationRepository implements IConfigurationRepository {
  config: Configuration | null = null;

  async set(configuration: Configuration): Promise<void> {
    this.config = configuration;
  }

  async get(): Promise<Configuration> {
    if (this.config === null) throw new Error('Configuration not set');
    return this.config;
  }
}
