import { type PropsWithChildren } from "react";
import BoLayout from "./components/bo_layout";
import { api } from "~/trpc/server";
import BoSetter from "./components/bo_setter";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import BoAuthObserver from "./components/bo_auth_observer";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
   const user = await getServerSession();

   if (!!user) {
      redirect("/auth");
   }

   try {
      const appointments = await api.appointments.getAll();
      const populatedAppointments = await api.appointments.getAllPopulated();

      return (
         <>
            <BoAuthObserver user={user} />
            <BoSetter
               appointments={appointments}
               populatedAppointments={populatedAppointments}
            />
            <BoLayout>{children}</BoLayout>
         </>
      );
   } catch (error) {
      redirect("/auth");
   }
}
