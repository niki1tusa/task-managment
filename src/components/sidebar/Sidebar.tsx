import { Menu } from "./Menu";
import {  menus } from "./menu.data";
import { projects } from "./projects.data";

export const Sidebar = () => {
  return (
    <aside className="w-1/6 h-screen bg-white flex flex-col items-center pt-4">
      <Menu title="Account"/>
      <span className="h-[1px] w-[80%] block bg-gray/50 my-5" />
      <Menu title="Menu" menus={menus}/>
      <span className="h-[1px] w-[80%] block bg-gray/50 my-5" />
      <Menu title="Projects" menus={projects}/>
    </aside>
  );
};
