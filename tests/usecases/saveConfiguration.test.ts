import { describe, it, mock } from 'node:test';
import assert from 'node:assert';

import { Configuration } from '../../src/domain/models/Configuration.js';
import { InMemoryConfigurationRepository } from '../../src/infrastructure/repositories/InMemoryConfigurationRepository.js';
import { SaveConfiguration } from '../../src/application/usecases/SaveConfiguration.js';

describe('saveConfiguration', () => {
  it('should save the configuration', async () => {
    const config: Configuration = {
      key: 'api-key',
      flavors: {
        retail: 'path/to/retail',
      },
    };

    const inMemoryConfigurationRepository: InMemoryConfigurationRepository = new InMemoryConfigurationRepository();

    const inMemoryConfigurationSpy = {
      set: mock.method(inMemoryConfigurationRepository, 'save'),
    };

    const saveConfiguration: SaveConfiguration = new SaveConfiguration(inMemoryConfigurationRepository);
    assert.strictEqual(inMemoryConfigurationRepository.config, null);
    await saveConfiguration.execute(config);

    assert.strictEqual(inMemoryConfigurationSpy.set.mock.calls.length, 1);
    assert.deepStrictEqual(inMemoryConfigurationSpy.set.mock.calls[0].arguments, [config]);
    assert.strictEqual(inMemoryConfigurationRepository.config, config);
  });
});
