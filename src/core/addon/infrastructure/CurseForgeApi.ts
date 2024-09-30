import type { IWoWAddonApi } from '../models/IWoWAddonApi.js';
import type { WoWAddon } from '../models/WoWAddon.js';

export class CurseForgeApi implements IWoWAddonApi {
  #apiKey: string;
  #fetch: typeof fetch;
  constructor(apiKey: string, fetchFunction: typeof fetch) {
    this.#apiKey = apiKey;
    this.#fetch = fetchFunction;
  }
  async fetchAddon(id: number): Promise<WoWAddon> {
    const BASE_URL = 'https://api.curseforge.com';
    const url = new URL(`/v1/mods/${id}`, BASE_URL);
    const headers = new Headers();
    headers.set('x-api-key', this.#apiKey);
    const response = await this.#fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch addon: ${response.statusText}`);
    }
    const { data } = await response.json();
    const mainFile = data.latestFiles.find((file: { id: number }) => file.id === data.mainFileId);
    const modules = mainFile.modules.map((module: { name: string }) => module.name);
    const downloadUrl = new URL(`https://www.curseforge.com/api/v1/mods/${id}/files/${data.mainFileId}/download`);
    return {
      id: data.id,
      name: data.name,
      fileId: data.mainFileId,
      fileModules: modules,
      downloadUrl,
    };
  }
}
