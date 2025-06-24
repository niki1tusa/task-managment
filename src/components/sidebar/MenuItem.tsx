import type { IMenuItem } from "@/types/menu.item.interface";

export const MenuItem = ({ title, Icon, color }: IMenuItem) => {
  return (
    <div
      className="flex items-center rounded-4xl 
    gap-1.5 font-semibold text-sm px-3 py-1 text-gray 
    hover:bg-blueviolet hover:text-white"
    >
    {Icon && <Icon />}
    {color && <div className={`w-3 h-3 ${color}`}/>}
      <div>{title}</div>
    </div>
  );
};
