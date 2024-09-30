import type { IWoWAddonApi } from './models/IWoWAddonApi.js';
import type { IWoWAddonRepository } from './models/IWoWAddonRepository.js';

import type { Download } from '../shared/download.js';
import type { Extract } from '../shared/extract.js';

export class InstallWoWAddon {
  #api: IWoWAddonApi;
  #repository: IWoWAddonRepository;
  #download: Download;
  #extract: Extract;
  constructor(api: IWoWAddonApi, repository: IWoWAddonRepository, download: Download, extract: Extract) {
    this.#api = api;
    this.#repository = repository;
    this.#download = download;
    this.#extract = extract;
  }
  async execute(id: number, path: string): Promise<void> {
    const addon = await this.#api.fetchAddon(id);
    const buffer = await this.#download(addon.downloadUrl);
    this.#extract(buffer, path);
    await this.#repository.saveAddon(addon);
  }
}
