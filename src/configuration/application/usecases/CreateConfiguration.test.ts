import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';

import { ERROR_MESSAGES } from '../../errors.js';
import { CreateConfiguration } from './CreateConfiguration.js';
import type { ConfigurationDTO } from '../dtos/ConfigurationDTO.js';
import type { IConfigurationRepository } from '../../domain/repositories/ConfigurationRepository.js';

describe('CreateConfiguration', () => {
  let createConfiguration: CreateConfiguration;
  let FakeConfigurationRepository: IConfigurationRepository;

  beforeEach(() => {
    FakeConfigurationRepository = {
      create: async () => {},
      exists: async () => false,
    } as unknown as IConfigurationRepository;
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);
  });

  const validConfig: ConfigurationDTO = {
    apiKey: 'api-key',
    flavors: [
      { name: 'retail', path: 'path/to/retail' },
      { name: 'classic', path: 'path/to/classic' },
    ],
  };

  it('should create a configuration if valid data is provided', async () => {
    const configuration = await createConfiguration.execute(validConfig);

    assert.ok(configuration);
    assert.strictEqual(configuration.apiKey, validConfig.apiKey);
    assert.deepStrictEqual(
      configuration.flavors.map((flavor) => ({ name: flavor.name, path: flavor.path })),
      validConfig.flavors
    );
  });

  it('should map flavors correctly', async () => {
    const configuration = await createConfiguration.execute(validConfig);
    assert.ok(configuration);
    assert(configuration.flavors instanceof Array);
    assert.strictEqual(configuration.flavors.length, validConfig.flavors.length);
    configuration.flavors.forEach((flavor, index) => {
      assert.strictEqual(flavor.name, validConfig.flavors[index].name);
      assert.strictEqual(flavor.path, validConfig.flavors[index].path);
    });
  });

  it('should throw an error if a configuration already exists', async () => {
    FakeConfigurationRepository.exists = async () => true;
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);

    await assert.rejects(
      createConfiguration.execute(validConfig),
      new Error(ERROR_MESSAGES.CONFIGURATION_ALREADY_EXISTS)
    );
  });

  it('should throw an error if configuration data is missing', async () => {
    await assert.rejects(
      createConfiguration.execute(null as unknown as ConfigurationDTO),
      new Error(ERROR_MESSAGES.CONFIGURATION_DATA_IS_REQUIRED)
    );
  });

  it('should throw an error if create fails', async () => {
    FakeConfigurationRepository.create = async () => {
      throw new Error('Failed to create');
    };
    createConfiguration = new CreateConfiguration(FakeConfigurationRepository);

    await assert.rejects(createConfiguration.execute(validConfig), new Error('Failed to create'));
  });
});
