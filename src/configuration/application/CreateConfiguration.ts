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
    const configuration = new Configuration(apiKey, paths);
    return this.#repository.create(configuration);
  }
}
