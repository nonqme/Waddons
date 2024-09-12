import { Configuration } from '../models/Configuration.js';

export interface IConfigurationRepository {
  save(configuration: Configuration): Promise<void>;
}
