import { menus } from "./menu.data";
import { MenuItem } from "./MenuItem";

interface Props {
  title?: string;
}

export const Menu = ({ title }: Props) => {
  return (
    <nav className="flex flex-col gap-4">
      <span>{title}</span>
      {menus.map((menu) => (
        <MenuItem key={menu.title} menu={menu} />
      ))}
    </nav>
  );
};
