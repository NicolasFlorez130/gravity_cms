import { type PropsWithChildren } from "react";
import BoLayout from "./components/bo_layout";
import { api } from "~/trpc/server";
import BoSetter from "./components/bo_setter";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
   const appointments = await api.appointments.getAll();

   return (
      <>
         <BoSetter appointments={appointments} />
         <BoLayout>{children}</BoLayout>
      </>
   );
}
