import { describe, test, mock } from 'node:test';
import assert from 'node:assert';

import { LoadConfiguration } from '../../application/LoadConfiguration.js';
import { configurationRepository } from '../mock.js';
import type { Configuration } from '../../domain/models/Configuration.js';

describe('LoadConfiguration', () => {
  test('should load a configuration', async () => {
    const configuration: Configuration = {
      apiKey: 'api-key',
      flavors: {
        retail: 'path/to/retail',
      },
    };
    const loadConfiguration: LoadConfiguration = new LoadConfiguration(configurationRepository);
    const spy = mock.method(configurationRepository, 'load');

    const result: Configuration = await loadConfiguration.execute();
    assert.deepStrictEqual(result, configuration);
    assert.strictEqual(spy.mock.calls.length, 1);
  });
});
