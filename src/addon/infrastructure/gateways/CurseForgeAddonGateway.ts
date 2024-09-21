import type { Addon } from '../../domain/models/Addon.js';
import type { IAddonGateway } from '../../domain/gateways/IAddonGateway.js';

export class CurseForgeAddonGateway implements IAddonGateway {
  #fetch: typeof global.fetch;
  #apiKey: string;
  #baseURL: URL = new URL('https://api.curseforge.com');
  constructor(fetch: typeof global.fetch, apiKey: string) {
    this.#fetch = fetch;
    this.#apiKey = apiKey;
  }
  async search(name: string): Promise<Array<Addon>> {
    const headers = new Headers();
    headers.set('x-api-key', this.#apiKey);
    headers.set('Accept', 'application/json');
    const searchURL = new URL('/v1/mods/search', this.#baseURL);
    searchURL.searchParams.set('gameId', '1');
    searchURL.searchParams.set('searchFilter', name);
    searchURL.searchParams.set('sortField', '2');
    searchURL.searchParams.set('sortOrder', 'desc');
    const response = await this.#fetch(searchURL, { headers });
    const { data } = await response.json();
    console.log(data[0]);

    const addons = data.map((addon: { id: number; name: string; summary: string; downloadCount: number }) => ({
      id: addon.id,
      name: addon.name,
      downloadCount: addon.downloadCount,
      description: addon.summary,
    }));
    return addons;
  }
}
