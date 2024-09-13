import { ERROR_MESSAGES } from '../errors.js';
import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';
import type { Configuration } from '../domain/models/Configuration.js';
import { FlavorEnum } from '../domain/models/Flavor.js';

export class CreateConfiguration {
  #repository: IConfigurationRepository;

  constructor(repository: IConfigurationRepository) {
    this.#repository = repository;
  }

  async execute({ apiKey, paths }: Configuration): Promise<Configuration> {
    const configurationExist = await this.#repository.exist();

    if (configurationExist) {
      throw new Error(ERROR_MESSAGES.configurationAlreadyExists);
    }

    this.#validateApiKey(apiKey);
    this.#validatePaths(paths);

    const configuration: Configuration = {
      apiKey,
      paths,
    };

    try {
      return this.#repository.create(configuration);
    } catch {
      throw new Error(ERROR_MESSAGES.errorCreatingConfiguration);
    }
  }
  #validateApiKey(apiKey: string): void {
    if (!apiKey) {
      throw new Error(ERROR_MESSAGES.apiKeyIsMissing);
    }

    if (typeof apiKey !== 'string') {
      throw new Error(ERROR_MESSAGES.apiKeyIsNotAString);
    }
  }

  #validatePaths(paths: Record<string, string>): void {
    const enumValues = Object.values(FlavorEnum);

    if (!paths) {
      throw new Error(ERROR_MESSAGES.pathsIsMissing);
    }

    if (typeof paths !== 'object' || Array.isArray(paths)) {
      throw new Error(ERROR_MESSAGES.pathsIsNotAnObject);
    }

    const pathKeys = Object.keys(paths);
    const pathValues = Object.values(paths);

    if (pathKeys.length === 0) {
      throw new Error(ERROR_MESSAGES.atLeastOnePathIsRequired);
    }

    if (!pathKeys.every((pathKey) => enumValues.includes(pathKey as FlavorEnum))) {
      throw new Error(ERROR_MESSAGES.invalidPathKey);
    }

    if (!pathValues.every((pathValue) => typeof pathValue === 'string')) {
      throw new Error(ERROR_MESSAGES.pathValueIsNotAString);
    }
  }
}
