import { describe, it } from 'node:test';
import assert from 'node:assert';

import { Configuration } from './Configuration.js';
import { Flavor } from './Flavor.js';
import { ERROR_MESSAGES } from '../../errors.js';
import { AVAILABLE_FLAVORS } from '../../config.js';

describe('Configuraiton Entity', () => {
  const apiKey = 'apiKey';

  it('should create a configuration entity', () => {
    const flavor = new Flavor(AVAILABLE_FLAVORS[0], 'path');
    const configuration = new Configuration(apiKey, [flavor]);
    assert.strictEqual(configuration.apiKey, apiKey);
    assert.strictEqual(configuration.flavors.length, 1);
    assert.strictEqual(configuration.flavors[0], flavor);
  });

  it('should throw an error if apiKey is missing', () => {
    assert.throws(() => new Configuration('', []), {
      message: ERROR_MESSAGES.API_KEY_IS_REQUIRED,
    });
  });

  it('should throw an error if apiKey is not a string', () => {
    assert.throws(() => new Configuration(1 as never, []), {
      message: ERROR_MESSAGES.API_KEY_MUST_BE_A_STRING,
    });
  });

  it('should throw an error if flavors is missing', () => {
    assert.throws(() => new Configuration(apiKey, null as never), {
      message: ERROR_MESSAGES.FLAVORS_IS_REQUIRED,
    });
  });

  it('should throw an error if flavors is not an array', () => {
    assert.throws(() => new Configuration(apiKey, {} as never), {
      message: ERROR_MESSAGES.FLAVORS_MUST_BE_AN_ARRAY,
    });
  });

  it('should throw an error if flavors is empty', () => {
    assert.throws(() => new Configuration(apiKey, []), {
      message: ERROR_MESSAGES.FLAVORS_SHOULD_HAVE_AT_LEAST_ONE_FLAVOR,
    });
  });

  it('should throw an error if flavors is not an array of Flavor instances', () => {
    assert.throws(() => new Configuration(apiKey, [{} as never]), {
      message: ERROR_MESSAGES.FLAVORS_MUST_BE_AN_ARRAY_OF_FLAVOR_INSTANCES,
    });
  });
});
