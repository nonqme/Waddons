import { Flavor } from './Flavor.js';

export type Paths = { retail: string } | { classic: string } | { [key in Flavor]: string };
