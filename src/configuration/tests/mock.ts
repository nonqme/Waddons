import type { IConfigurationRepository } from '../domain/repositories/IConfigurationRepository.js';

export const configurationRepository: IConfigurationRepository = {
  load: async () => ({ apiKey: 'api-key', flavors: { retail: 'path/to/retail' } }),
  create: async (configuration) => configuration,
};
