import { ERROR_MESSAGES } from '../errors.js';
import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';
import type { Configuration } from '../domain/models/Configuration.js';
import { FlavorEnum } from '../domain/models/Flavor.js';

export class CreateConfiguration {
  #repository: IConfigurationRepository;

  constructor(repository: IConfigurationRepository) {
    this.#repository = repository;
  }

  async execute(data: Configuration): Promise<Configuration> {
    if (await this.#repository.exists()) {
      throw new Error(ERROR_MESSAGES.configurationAlreadyExists);
    }
    if (!data.apiKey) {
      throw new Error(ERROR_MESSAGES.apiKeyIsRequired);
    }
    if (!data.paths || Object.keys(data.paths).length === 0) {
      throw new Error(ERROR_MESSAGES.atLeastOnePathIsRequired);
    }

    for (const key in data.paths) {
      if (!Object.values(FlavorEnum).includes(key as FlavorEnum)) {
        throw new Error(ERROR_MESSAGES.invalidPathKeys);
      }
    }

    const configuration: Configuration = {
      apiKey: data.apiKey,
      paths: data.paths,
    };

    try {
      return this.#repository.create(configuration);
    } catch {
      throw new Error(ERROR_MESSAGES.errorCreatingConfiguration);
    }
  }
}
