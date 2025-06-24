import { account } from "./menu/data/account.data";
import { Menu } from "./menu/Menu";
import {  menus } from "./menu/data/menu.data";
import { projects } from "./menu/data/projects.data";
import { Profile } from "./profile/Profile";

export const Sidebar = () => {
  return (
    <aside className="w-1/6 h-screen bg-white dark:bg-slate-900 flex flex-col items-start pl-10 pt-4">
      <Profile title="Account" data={account}/>
      <Menu heading="Menu" menus={menus} isBorderTop={true}/>
      <Menu heading="Projects" menus={projects} isBorderTop={true}/>
    </aside>
  );
};
