export interface Configuration {
  apiKey: string;
  flavors: {
    retail?: string;
    classic?: string;
    wotlkClassic?: string;
    tbcClassic?: string;
    cataclysmClassic?: string;
  } & (
    | { retail: string }
    | { classic: string }
    | { 'wotlk-classic': string }
    | { 'tbc-classic': string }
    | { 'cataclysm-classic': string }
  );
}
