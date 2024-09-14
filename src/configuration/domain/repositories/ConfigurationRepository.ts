import type { ConfigurationDTO } from '../../application/dtos/ConfigurationDTO.js';
import { Configuration } from '../entities/Configuration.js';

export interface IConfigurationRepository {
  create(configuration: Configuration): Promise<void>;
  exists(): Promise<boolean>;
  load(): Promise<ConfigurationDTO>;
}
