import StoreSetter from "~/components/shared/setters/store_setter";
import { api } from "~/trpc/server";

interface IGlobalsGetter {}

export default async function GlobalsGetter({}: IGlobalsGetter) {
   const [appointments, services, packages] = await Promise.all([
      api.appointments.getAllConfirmed(),
      api.appointments.getAllServicesConfirmed(),
      api.packages.getAll(),
   ]);

   return (
      <StoreSetter
         appointments={appointments.map(({ appointment }) => appointment)}
         packages={packages}
         services={services}
      />
   );
}
