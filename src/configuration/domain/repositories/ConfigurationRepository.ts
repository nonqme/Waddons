import { Configuration } from '../models/Configuration.js';

export interface IConfigurationRepository {
  create(configuration: Configuration): Promise<Configuration>;
  load(): Promise<Configuration>;
}
