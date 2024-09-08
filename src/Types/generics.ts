type MapItem = {
  key: string;
  value: string;
};

type Action = {
  getTitle: () => string;
  onAction: (...args: any[]) => any;
};

// eslint-disable-next-line import/prefer-default-export
export type { MapItem, Action };
