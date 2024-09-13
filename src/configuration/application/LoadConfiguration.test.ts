import { describe, it, beforeEach } from 'node:test';

import assert from 'node:assert';

import { Configuration } from '../domain/models/Configuration.js';
import { LoadConfiguration } from './LoadConfiguration.js';
import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';
import { ERROR_MESSAGES } from '../errors.js';

describe('CreateConfiguration', () => {
  let loadConfiguration: LoadConfiguration;
  let FakeConfigurationRepository: IConfigurationRepository;

  const configuration = new Configuration('api-key', {
    retail: 'path/to/retail',
  });

  beforeEach(() => {
    FakeConfigurationRepository = {
      load: async () => configuration,
      exist: async () => true,
    } as IConfigurationRepository;
    loadConfiguration = new LoadConfiguration(FakeConfigurationRepository);
  });

  it('should return the configuration', async () => {
    const configuration = await loadConfiguration.execute();

    assert.ok(configuration);
    assert.deepStrictEqual(configuration.apiKey, configuration.apiKey);
    assert.deepStrictEqual(configuration.paths, configuration.paths);
  });

  it('should throw an error if the configuration does not exist', async () => {
    FakeConfigurationRepository.exist = async () => false;
    loadConfiguration = new LoadConfiguration(FakeConfigurationRepository);

    await assert.rejects(loadConfiguration.execute(), new Error(ERROR_MESSAGES.configurationDoesNotExist));
  });
});
