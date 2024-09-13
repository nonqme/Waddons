import { describe, it, beforeEach } from 'node:test';

import assert from 'node:assert';

import { CreateConfiguration } from './CreateConfiguration.js';
import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';
import type { Configuration } from '../domain/models/Configuration.js';

import { ERROR_MESSAGES } from '../errors.js';

describe('CreateConfiguration', () => {
  let createConfiguration: CreateConfiguration;
  let FakeConfigurationRepository: IConfigurationRepository;

  beforeEach(() => {
    FakeConfigurationRepository = {
      create: async (configuration) => configuration,
      exists: async () => false,
    };
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);
  });

  const validConfig: Configuration = {
    apiKey: 'api-key',
    paths: {
      retail: 'path/to/retail',
      classic: 'path/to/classic',
    },
  };

  it('should throw an error if a configuration already exists', async () => {
    FakeConfigurationRepository.exists = async () => true;
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);

    await assert.rejects(
      createConfiguration.execute(validConfig),
      new Error(ERROR_MESSAGES.configurationAlreadyExists)
    );
  });

  it('should throw an error if the API key is missing', async () => {
    const invalidConfig = {
      paths: {
        retail: 'path/to/retail',
        classic: 'path/to/classic',
      },
    } as Configuration;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.apiKeyIsRequired));
  });

  it('should throw an error if no paths are provided', async () => {
    const invalidConfig = {
      apiKey: 'api-key',
    } as Configuration;

    await assert.rejects(
      createConfiguration.execute(invalidConfig),
      new Error(ERROR_MESSAGES.atLeastOnePathIsRequired)
    );
  });

  it('should throw an error if the paths provided are invalid', async () => {
    const invalidConfig = {
      apiKey: 'api-key',
      paths: {
        invalid: 'path/to/invalid',
      } as Record<string, string>,
    } as Configuration;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.invalidPathKeys));
  });

  it('should throw an error if the repository fails to create the configuration', async () => {
    FakeConfigurationRepository.create = () => {
      throw new Error();
    };
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);

    await assert.rejects(
      createConfiguration.execute(validConfig),
      new Error(ERROR_MESSAGES.errorCreatingConfiguration)
    );
  });

  it('should return the configuration', async () => {
    const configuration = await createConfiguration.execute(validConfig);

    assert.deepStrictEqual(configuration, validConfig);
  });
});
