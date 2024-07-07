"use client";

import { useEffect } from "react";
import { useStore } from "~/lib/features/store";
import type { Appointment, Service } from "~/types/appointments";
import type { IPackage } from "~/types/packages";

interface IStoreSetter {
   appointments: Appointment[];
   services: Service[];
   packages: IPackage[];
}

export default function StoreSetter({
   appointments,
   services,
   packages,
}: IStoreSetter) {
   const setAll = useStore.use.setServicesAndAppointments();

   const setPackages = useStore.use.setPackages();

   useEffect(() => {
      setAll({
         appointments,
         services,
      });

      setPackages(packages);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [appointments, services]);

   return true;
}
