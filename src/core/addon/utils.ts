import AdmZip from 'adm-zip';

export const extract = async (buffer: Buffer, path: string): Promise<void> => {
  const zip = new AdmZip(buffer);
  zip.extractAllTo(path, true);
};
