export type Download = (url: URL) => Promise<Buffer>;

export const download: Download = async (url: URL): Promise<Buffer> => {
  const downloadResponse = await fetch(url);
  if (!downloadResponse.ok) {
    throw new Error(`Failed to download addon: ${downloadResponse.statusText}`);
  }
  const file = await downloadResponse.arrayBuffer();
  return Buffer.from(file);
};
