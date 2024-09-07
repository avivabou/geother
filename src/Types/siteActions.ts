export type MenuItem = {
  title: string;
  onClick: () => void;
};

export type MenuLogoItem = {
  logoUrl: string;
  onClick?: () => void;
};
