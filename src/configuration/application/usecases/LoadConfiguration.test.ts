import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';

import { ERROR_MESSAGES } from '../../errors.js';

import { LoadConfiguration } from './LoadConfiguration.js';
import type { IConfigurationRepository } from '../../domain/repositories/ConfigurationRepository.js';
import type { ConfigurationDTO } from '../dtos/ConfigurationDTO.js';

describe('LoadConfiguration', () => {
  let loadConfiguration: LoadConfiguration;
  let FakeConfigurationRepository: IConfigurationRepository;

  beforeEach(() => {
    FakeConfigurationRepository = {
      load: async () =>
        ({
          apiKey: 'api-key',
          flavors: [
            { name: 'retail', path: 'path/to/retail' },
            { name: 'classic', path: 'path/to/classic' },
          ],
        }) as ConfigurationDTO,
      exists: async () => true,
    } as IConfigurationRepository;

    loadConfiguration = new LoadConfiguration(FakeConfigurationRepository);
  });

  it('should load a configuration if it exists', async () => {
    const configuration = await loadConfiguration.execute();

    assert.ok(configuration);
    assert.strictEqual(configuration.apiKey, 'api-key');
    assert.deepStrictEqual(
      configuration.flavors.map((flavor) => ({ name: flavor.name, path: flavor.path })),
      [
        { name: 'retail', path: 'path/to/retail' },
        { name: 'classic', path: 'path/to/classic' },
      ]
    );
  });

  it('should map flavors correctly', async () => {
    const configuration = await loadConfiguration.execute();
    assert.ok(configuration);
    assert(configuration.flavors instanceof Array);
    assert.strictEqual(configuration.flavors.length, 2);
    configuration.flavors.forEach((flavor, index) => {
      assert.strictEqual(flavor.name, ['retail', 'classic'][index]);
      assert.strictEqual(flavor.path, `path/to/${['retail', 'classic'][index]}`);
    });
  });

  it('should throw an error if a configuration does not exist', async () => {
    FakeConfigurationRepository.exists = async () => false;
    loadConfiguration = new LoadConfiguration(FakeConfigurationRepository);

    await assert.rejects(loadConfiguration.execute(), new Error(ERROR_MESSAGES.CONFIGURATION_NOT_FOUND));
  });

  it('should throw an error if an error occurs while loading the configuration', async () => {
    FakeConfigurationRepository.load = async () => {
      throw new Error('An error occurred');
    };
    loadConfiguration = new LoadConfiguration(FakeConfigurationRepository);

    await assert.rejects(loadConfiguration.execute(), new Error('An error occurred'));
  });
});
