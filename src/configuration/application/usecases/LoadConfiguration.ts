import type { IConfigurationRepository } from '../../domain/repositories/ConfigurationRepository.js';
import type { ConfigurationDTO } from '../dtos/ConfigurationDTO.js';
import { Configuration } from '../../domain/entities/Configuration.js';
import { Flavor } from '../../domain/entities/Flavor.js';

import { ERROR_MESSAGES } from '../../errors.js';

export class LoadConfiguration {
  #repository: IConfigurationRepository;
  constructor(repository: IConfigurationRepository) {
    this.#repository = repository;
  }
  async execute(): Promise<Configuration> {
    const configurationExists = await this.#repository.exists();
    if (!configurationExists) {
      throw new Error(ERROR_MESSAGES.CONFIGURATION_NOT_FOUND);
    }
    try {
      const configuration: ConfigurationDTO = await this.#repository.load();
      const flavors = configuration.flavors.map((flavor) => new Flavor(flavor.name, flavor.path));
      return new Configuration(configuration.apiKey, flavors);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
