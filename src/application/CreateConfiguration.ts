import { Configuration } from '../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../domain/repositories/IConfigurationRepository.js';

export class CreateConfiguration {
  #configurationRepository: IConfigurationRepository;
  constructor(configurationRepository: IConfigurationRepository) {
    this.#configurationRepository = configurationRepository;
  }
  async execute(configuration: Configuration): Promise<Configuration> {
    return this.#configurationRepository.create(configuration);
  }
}
