import type { IConfigurationRepository } from '../../domain/repositories/ConfigurationRepository.js';
import { Configuration } from '../../domain/entities/Configuration.js';
import { Flavor } from '../../domain/entities/Flavor.js';
import type { ConfigurationDTO } from '../dtos/ConfigurationDTO.js';

import { ERROR_MESSAGES } from '../../errors.js';

export class CreateConfiguration {
  #repository: IConfigurationRepository;

  constructor(repository: IConfigurationRepository) {
    this.#repository = repository;
  }

  async execute(configurationData: ConfigurationDTO): Promise<Configuration> {
    const configurationExists = await this.#repository.exists();
    if (configurationExists) {
      throw new Error(ERROR_MESSAGES.CONFIGURATION_ALREADY_EXISTS);
    }
    if (!configurationData) {
      throw new Error(ERROR_MESSAGES.CONFIGURATION_DATA_IS_REQUIRED);
    }

    const flavors = configurationData.flavors.map((flavor) => new Flavor(flavor.name, flavor.path));
    const configuration = new Configuration(configurationData.apiKey, flavors);
    try {
      await this.#repository.create(configuration);
      return configuration;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
