import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
   const session = await api.getSession();

   if (!session) {
      return <>{children}</>;
   } else {
      redirect("/bo/dashboard");
   }
}
