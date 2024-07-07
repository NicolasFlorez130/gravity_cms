import { type PropsWithChildren } from "react";
import BoLayout from "./components/bo_layout";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import BoAuthObserver from "./components/bo_auth_observer";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
   const user = await getServerSession();

   if (!!user) {
      redirect("/auth");
   }

   return (
      <>
         <BoAuthObserver user={user} />
         <BoLayout>{children}</BoLayout>
      </>
   );
}
