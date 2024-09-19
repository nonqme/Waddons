import type { Configuration } from '../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../domain/repositories/IConfigurationRepository.js';

export class LoadConfiguration {
  #configurationRepository;
  constructor(configurationRepository: IConfigurationRepository) {
    this.#configurationRepository = configurationRepository;
  }
  async execute(): Promise<Configuration> {
    return this.#configurationRepository.load();
  }
}
