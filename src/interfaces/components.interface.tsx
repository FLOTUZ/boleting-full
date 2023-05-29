// MenuItems for drawer-menu.component.tsx and left-menu.component.tsx
export interface MenuItems {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  subMenuItems?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
}
