import { Flavor } from './Flavor.js';
import { ERROR_MESSAGES } from '../../errors.js';

export class Configuration {
  #apiKey: string;
  #flavors: Flavor[];
  constructor(apiKey: string, flavors: Flavor[]) {
    this.#validateApiKey(apiKey);
    this.#validateFlavors(flavors);

    this.#apiKey = apiKey;
    this.#flavors = flavors;
  }
  get apiKey(): string {
    return this.#apiKey;
  }
  get flavors(): Flavor[] {
    return this.#flavors;
  }

  #validateApiKey(apiKey: string): void {
    if (!apiKey) {
      throw new Error(ERROR_MESSAGES.API_KEY_IS_REQUIRED);
    }
    if (typeof apiKey !== 'string') {
      throw new Error(ERROR_MESSAGES.API_KEY_MUST_BE_A_STRING);
    }
  }

  #validateFlavors(flavors: Flavor[]): void {
    if (!flavors) {
      throw new Error(ERROR_MESSAGES.FLAVORS_IS_REQUIRED);
    }
    if (!Array.isArray(flavors)) {
      throw new Error(ERROR_MESSAGES.FLAVORS_MUST_BE_AN_ARRAY);
    }
    if (flavors.length === 0) {
      throw new Error(ERROR_MESSAGES.FLAVORS_SHOULD_HAVE_AT_LEAST_ONE_FLAVOR);
    }
    if (flavors.some((flavor) => !(flavor instanceof Flavor))) {
      throw new Error(ERROR_MESSAGES.FLAVORS_MUST_BE_AN_ARRAY_OF_FLAVOR_INSTANCES);
    }
  }
}
