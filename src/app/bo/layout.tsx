import { type PropsWithChildren } from "react";
import BoLayout from "./components/bo_layout";
import { redirect } from "next/navigation";
import BoAuthObserver from "./components/bo_auth_observer";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
   const session = await api.getSession();

   if (!session) {
      redirect("/auth");
   } else {
      return (
         <>
            <BoAuthObserver serverSession={session} />
            <BoLayout>{children}</BoLayout>
         </>
      );
   }
}
