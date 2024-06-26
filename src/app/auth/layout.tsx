import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { getServerAuthSession } from "~/server/auth";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
   const session = await getServerAuthSession();

   if (!session?.user) {
      return <>{children}</>;
   } else {
      redirect("/bo/dashboard");
   }
}
