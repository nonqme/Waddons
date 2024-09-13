import { ERROR_MESSAGES } from '../../errors.js';
import type { Paths } from './Path.js';
import { FlavorEnum } from './Flavor.js';

export class Configuration {
  apiKey: string;
  paths: Paths;

  constructor(apiKey: string, paths: Paths) {
    this.#validateApiKey(apiKey);
    this.#validatePaths(paths);

    this.apiKey = apiKey;
    this.paths = paths;
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
