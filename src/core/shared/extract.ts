import AdmZip from 'adm-zip';

export type Extract = (buffer: Buffer, path: string) => void;

export const extract: Extract = (buffer, path) => {
  const zip = new AdmZip(buffer);
  zip.extractAllTo(path, true);
};
