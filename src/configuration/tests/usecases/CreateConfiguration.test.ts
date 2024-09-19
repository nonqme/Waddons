import { describe, it, mock } from 'node:test';
import assert from 'node:assert';

import type { Configuration } from '../../domain/models/Configuration.js';
import type { IConfigurationRepository } from '../../domain/repositories/IConfigurationRepository.js';

import { CreateConfiguration } from '../../application/CreateConfiguration.js';
import { MockConfigRepository } from '../mock/MockConfigRepository.js';

describe('CreateConfiguration', () => {
  it('should create a configuration', async () => {
    const configuration: Configuration = {
      apiKey: 'api-key',
      flavors: {
        retail: 'path/to/retail',
      },
    };

    const configurationRepository: IConfigurationRepository = new MockConfigRepository();
    const spy = mock.method(configurationRepository, 'create');

    const createConfiguration: CreateConfiguration = new CreateConfiguration(configurationRepository);
    const result: Configuration = await createConfiguration.execute(configuration);

    assert.strictEqual(result, configuration);
    assert.strictEqual(spy.mock.calls.length, 1);
    assert.strictEqual(spy.mock.calls[0].arguments[0], configuration);
  });
});
