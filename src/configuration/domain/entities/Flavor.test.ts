import { describe, it } from 'node:test';
import assert from 'node:assert';

import { Flavor } from './Flavor.js';
import { ERROR_MESSAGES } from '../../errors.js';

describe('Flavor Entity', () => {
  const name = 'name';
  const path = 'path';

  it('should create a flavor entity', () => {
    const flavor = new Flavor(name, path);
    assert.strictEqual(flavor.name, name);
    assert.strictEqual(flavor.path, path);
  });

  it('should throw an error if name is missing', () => {
    assert.throws(() => new Flavor('', path), {
      message: ERROR_MESSAGES.NAME_IS_REQUIRED,
    });
  });

  it('should throw an error if name is not a string', () => {
    assert.throws(() => new Flavor(1 as never, path), {
      message: ERROR_MESSAGES.NAME_MUST_BE_A_STRING,
    });
  });

  it('should throw an error if path is missing', () => {
    assert.throws(() => new Flavor(name, ''), {
      message: ERROR_MESSAGES.PATH_IS_REQUIRED,
    });
  });

  it('should throw an error if path is not a string', () => {
    assert.throws(() => new Flavor(name, 1 as never), {
      message: ERROR_MESSAGES.PATH_MUST_BE_A_STRING,
    });
  });
});
