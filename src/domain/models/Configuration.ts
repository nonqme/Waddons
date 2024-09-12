type Flavors = 'retail';

export type Configuration = {
  key: string;
  flavors: {
    [key in Flavors]?: string;
  };
};
