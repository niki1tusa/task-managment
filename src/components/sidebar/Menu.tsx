import type { IMenuItem } from "@/types/menu.item.interface";
import { MenuItem } from "./MenuItem";

interface Projects {
  title?: string;
  color?: string;
}
interface Props {
  title?: string;
  menus?: IMenuItem[] | Projects[];
}

export const Menu = ({ title, menus }: Props) => {
  return (
    <nav className="flex flex-col gap-4">
      <span className="text-gray font-semibold text-lg">{title}</span>
      {menus &&
        menus.map((menu) => (
          <MenuItem key={menu.title} title={menu.title} color={menu.color} Icon={menu.Icon} />
        ))}
    </nav>
  );
};
