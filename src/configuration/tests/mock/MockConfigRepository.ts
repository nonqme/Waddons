import type { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/IConfigurationRepository.js';

export class MockConfigRepository implements IConfigurationRepository {
  async create(configuration: Configuration): Promise<Configuration> {
    return configuration;
  }
  async load(): Promise<Configuration> {
    const configuration: Configuration = { apiKey: 'api-key', flavors: { retail: 'path/to/retail' } };
    return configuration;
  }
}
