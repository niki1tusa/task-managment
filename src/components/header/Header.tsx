'use client'
import { Bell, Search } from "lucide-react";
import dynamic from "next/dynamic";
const DynamicToggleTheme = dynamic(() => import('../toggle-theme/ToggleTheme').then((mod) => mod.ToggleTheme), { ssr: false })

export const Header = () => {
  return (
    <div className="bg-transparent flex justify-between items-center pt-4 ">
      <div className="font-bold text-3xl">Dashboard</div>
      <div className="flex gap-2 items-center ">
        <span className="flex items-center gap-2 px-2 bg-white rounded-4xl text-gray">
          <Search className="text-dark" />
          <input
            type="text"
            className="px-2 py-2 outline-none w-[300px]"
            placeholder="Search something..."
          />
        </span>
        <span className="text-center rounded-full bg-white">
          <Bell className="text-dark mx-2 my-2" />
        </span>
        <DynamicToggleTheme/>
      </div>
    </div>
  );
};
