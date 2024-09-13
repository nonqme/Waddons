import { describe, it, beforeEach } from 'node:test';

import assert from 'node:assert';

import { CreateConfiguration, CreateConfigurationDTO } from './CreateConfiguration.js';
import type { IConfigurationRepository } from '../domain/repositories/ConfigurationRepository.js';

import { ERROR_MESSAGES } from '../errors.js';

describe('CreateConfiguration', () => {
  let createConfiguration: CreateConfiguration;
  let FakeConfigurationRepository: IConfigurationRepository;

  beforeEach(() => {
    FakeConfigurationRepository = {
      create: async (configuration) => configuration,
    } as IConfigurationRepository;
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);
  });

  const validConfig: CreateConfigurationDTO = {
    apiKey: 'api-key',
    paths: {
      retail: 'path/to/retail',
      classic: 'path/to/classic',
    },
  };

  it('should throw an error if a configuration already exists', async () => {
    FakeConfigurationRepository.create = async () => {
      throw new Error(ERROR_MESSAGES.configurationAlreadyExists);
    };
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);

    await assert.rejects(
      createConfiguration.execute(validConfig),
      new Error(ERROR_MESSAGES.configurationAlreadyExists)
    );
  });

  it('should throw an error if the API key property is missing', async () => {
    const invalidConfig = {
      paths: {
        retail: 'path/to/retail',
        classic: 'path/to/classic',
      },
    } as CreateConfigurationDTO;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.apiKeyIsMissing));
  });

  it('should throw an error if the paths property is missing', async () => {
    const invalidConfig = {
      apiKey: 'api-key',
    } as CreateConfigurationDTO;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.pathsIsMissing));
  });

  it('should throw an error if no paths are provided', async () => {
    const invalidConfig = {
      apiKey: 'api-key',
      paths: {},
    } as CreateConfigurationDTO;

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
    } as CreateConfigurationDTO;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.invalidPathKey));
  });

  it('should throw an error if the API key is not a string', async () => {
    const invalidConfig = {
      apiKey: 123 as unknown as string,
      paths: {
        retail: 'path/to/retail',
        classic: 'path/to/classic',
      },
    } as CreateConfigurationDTO;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.apiKeyIsNotAString));
  });

  it('should throw an error if the paths property is not an object', async () => {
    const invalidConfig = {
      apiKey: 'api-key',
      paths: 'invalid' as unknown as Record<string, string>,
    } as CreateConfigurationDTO;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.pathsIsNotAnObject));
  });

  it('should throw an error if the paths property is an array', async () => {
    const invalidConfig = {
      apiKey: 'api-key',
      paths: [] as unknown as Record<string, string>,
    } as CreateConfigurationDTO;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.pathsIsNotAnObject));
  });

  it('should throw an error if the path value is not a string', async () => {
    const invalidConfig = {
      apiKey: 'api-key',
      paths: {
        retail: 'path/to/retail',
        classic: 123 as unknown as string,
      },
    } as CreateConfigurationDTO;

    await assert.rejects(createConfiguration.execute(invalidConfig), new Error(ERROR_MESSAGES.pathValueIsNotAString));
  });

  it('should return the configuration', async () => {
    const configuration = await createConfiguration.execute(validConfig);

    assert.ok(configuration);
    assert.deepStrictEqual(configuration.apiKey, validConfig.apiKey);
    assert.deepStrictEqual(configuration.paths, validConfig.paths);
  });
});
