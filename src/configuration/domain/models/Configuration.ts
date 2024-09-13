import type { Flavor } from './Flavor.js';

export interface Configuration {
  apiKey: string;
  paths: {
    [key in Flavor]: string;
  };
}
