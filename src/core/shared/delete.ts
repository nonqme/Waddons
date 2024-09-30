import Fs from 'node:fs/promises';

export type Delete = (path: string) => Promise<void>;

export const deleteFolder: Delete = async (path) => {
  await Fs.rm(path, { recursive: true });
};
