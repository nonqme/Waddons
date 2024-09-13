import { ERROR_MESSAGES } from '../errors.js';
import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';
import type { Paths } from '../domain/models/Path.js';
import { Configuration } from '../domain/models/Configuration.js';

export interface CreateConfigurationDTO {
  apiKey: string;
  paths: Paths;
}

export class CreateConfiguration {
  #repository: IConfigurationRepository;

  constructor(repository: IConfigurationRepository) {
    this.#repository = repository;
  }

  async execute({ apiKey, paths }: CreateConfigurationDTO): Promise<Configuration> {
    const configurationExist = await this.#repository.exist();
    if (configurationExist) {
      throw new Error(ERROR_MESSAGES.configurationAlreadyExists);
    }
    const configuration = new Configuration(apiKey, paths);
    try {
      return this.#repository.create(configuration);
    } catch {
      throw new Error(ERROR_MESSAGES.errorCreatingConfiguration);
    }
  }
}
