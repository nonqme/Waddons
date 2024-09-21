import { describe, it, mock } from 'node:test';
import assert from 'node:assert';

import { SearchAddon } from '../../application/SearchAddon.js';

import type { Addon } from '../../domain/models/Addon.js';
import type { IAddonGateway } from '../../domain/gateways/IAddonGateway.js';

describe('SearchAddon', () => {
  it('should search an addon', async () => {
    const addon: Addon = {
      id: 1,
      name: 'addon',
      description: 'addon description',
      downloadCount: 100,
    };

    const addonGateway: IAddonGateway = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      search: async (_name: string): Promise<Array<Addon>> => [addon],
    };

    const searchAddon: SearchAddon = new SearchAddon(addonGateway);
    const spy = mock.method(addonGateway, 'search');

    const result: Array<Addon> = await searchAddon.execute(addon.name);
    assert.deepStrictEqual(result, [addon]);
    assert.strictEqual(spy.mock.calls.length, 1);
    assert.strictEqual(spy.mock.calls[0].arguments[0], addon.name);
  });
});
