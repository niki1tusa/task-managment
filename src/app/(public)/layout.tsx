import { Sidebar } from "@/components/sidebar/Sidebar";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex-1 px-7">{children}</div>
      <div className="bg-blueviolet w-1/4 text-white text-8xl flex justify-center items-center">
        Chat
      </div>
    </div>
  );
}
