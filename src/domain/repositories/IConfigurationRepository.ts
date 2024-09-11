import { Configuration } from '../models/Configuration.js';

export interface IConfigurationRepository {
  set(configuration: Configuration): Promise<void>;
  get(): Promise<Configuration>;
}
