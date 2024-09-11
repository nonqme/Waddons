import type { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/IConfigurationRepository.js';

export class SetConfiguration {
  constructor(private configurationRepository: IConfigurationRepository) {}

  async execute(configuration: Configuration): Promise<void> {
    await this.configurationRepository.set(configuration);
  }
}
