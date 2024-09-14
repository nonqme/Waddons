import { ERROR_MESSAGES } from '../../errors.js';

export class Flavor {
  #name: string;
  #path: string;
  constructor(name: string, path: string) {
    this.#validateName(name);
    this.#validatePath(path);

    this.#name = name;
    this.#path = path;
  }
  get name(): string {
    return this.#name;
  }
  get path(): string {
    return this.#path;
  }

  #validateName(name: string): void {
    if (!name) {
      throw new Error(ERROR_MESSAGES.NAME_IS_REQUIRED);
    }
    if (typeof name !== 'string') {
      throw new Error(ERROR_MESSAGES.NAME_MUST_BE_A_STRING);
    }
  }
  #validatePath(path: string): void {
    if (!path) {
      throw new Error(ERROR_MESSAGES.PATH_IS_REQUIRED);
    }
    if (typeof path !== 'string') {
      throw new Error(ERROR_MESSAGES.PATH_MUST_BE_A_STRING);
    }
  }
}
