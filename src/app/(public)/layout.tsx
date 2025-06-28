import { Sidebar } from "@/components/sidebar/Sidebar";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="grid grid-cols-[15%_60%_25%] justify-between">
      <Sidebar />
      <div className="flex-1 pl-5 pr-10 dark:border-r dark:border-l dark:border-neutral-800">{children}</div>
      <div className="bg-chat  text-white text-8xl flex justify-center items-center">
        Chat
      </div>
    </div>
  );
}
