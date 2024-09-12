import { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/IConfigurationRepository.js';

export class InMemoryConfigurationRepository implements IConfigurationRepository {
  config: Configuration | null = null;

  async save(configuration: Configuration): Promise<void> {
    this.config = configuration;
  }
}
