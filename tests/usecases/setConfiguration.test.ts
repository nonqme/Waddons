import { describe, it, mock } from 'node:test';
import assert from 'node:assert';

import type { Configuration } from '../../src/domain/models/Configuration.js';
import { InMemoryConfigurationRepository } from '../../src/infrastructure/repositories/InMemoryConfigurationRepository.js';
import { SetConfiguration } from '../../src/application/usecases/SetConfiguration.js';

describe('setConfiguration', () => {
  it('should set the configuration', async () => {
    const config: Configuration = {
      flavors: [
        {
          name: 'retail',
          path: 'path/to/retail',
        },
        {
          name: 'classic',
          path: 'path/to/classic',
        },
        {
          name: 'cataclysm classic',
          path: null,
        },
        {
          name: 'woltk classic',
          path: null,
        },
      ],
    };

    const inMemoryConfigurationRepository: InMemoryConfigurationRepository = new InMemoryConfigurationRepository();

    const inMemoryConfigurationSpy = {
      set: mock.method(inMemoryConfigurationRepository, 'set'),
    };

    const setConfiguration: SetConfiguration = new SetConfiguration(inMemoryConfigurationRepository);
    await setConfiguration.execute(config);

    assert.strictEqual(inMemoryConfigurationSpy.set.mock.calls.length, 1);
    assert.deepStrictEqual(inMemoryConfigurationSpy.set.mock.calls[0].arguments, [config]);
    assert.strictEqual(inMemoryConfigurationRepository.config, config);
  });
});
