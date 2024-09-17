export interface Configuration {
  apiKey: string;
  flavors: Record<'retail' | 'classic' | 'wotlk-classic' | 'tbc-classic' | 'cataclysm-classic', string>;
}
