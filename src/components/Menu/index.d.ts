export type MenuItemProps = {
  id: string;
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
};
