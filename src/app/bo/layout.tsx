import type { PropsWithChildren } from "react";
import Sidebar from "~/components/bo/ui/sidebar";

export default function Layout({ children }: PropsWithChildren<unknown>) {
   return (
      <div className="grid grid-cols-[auto_1fr] gap-[1px]">
         <Sidebar />
         <div>{children}</div>
      </div>
   );
}
