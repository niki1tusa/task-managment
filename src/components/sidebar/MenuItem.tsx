import { LucideIcon } from "lucide-react";

interface Props {
  menu: { title: string; Icon: LucideIcon };
}
export const MenuItem = ({ menu }: Props) => {
  return (
    <div className="flex items-center gap-1.5 font-semibold">
      <div>
        <menu.Icon />
      </div>
      <div>{menu.title}</div>
    </div>
  );
};
