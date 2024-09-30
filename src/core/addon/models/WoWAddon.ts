export interface WoWAddon {
  id: number;
  name: string;
  fileId: number;
  fileModules: string[];
  downloadUrl?: URL;
  path?: string;
}
