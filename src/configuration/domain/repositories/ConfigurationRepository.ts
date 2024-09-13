import { Configuration } from '../models/Configuration.js';

export interface IConfigurationRepository {
  create(configuration: Configuration): Promise<Configuration>;
  exists(): Promise<boolean>;
}
