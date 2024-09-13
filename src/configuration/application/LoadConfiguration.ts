import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';

export class LoadConfiguration {
  #repository: IConfigurationRepository;
  constructor(repository: IConfigurationRepository) {
    this.#repository = repository;
  }
  async execute() {
    return this.#repository.load();
  }
}
