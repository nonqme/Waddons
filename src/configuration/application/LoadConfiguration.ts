import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';
import { ERROR_MESSAGES } from '../errors.js';

export class LoadConfiguration {
  #repository: IConfigurationRepository;
  constructor(repository: IConfigurationRepository) {
    this.#repository = repository;
  }
  async execute() {
    const configurationExist = await this.#repository.exist();
    if (!configurationExist) {
      throw new Error(ERROR_MESSAGES.configurationDoesNotExist);
    }
    return this.#repository.load();
  }
}
