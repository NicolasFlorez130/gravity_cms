import StoreSetter from "~/components/shared/setters/store_setter";
import { api } from "~/trpc/server";

interface IGlobalsGetter {}

export default async function GlobalsGetter({}: IGlobalsGetter) {
   const [appointments, services, packages] = await Promise.all([
      api.appointments.getAll(),
      api.appointments.getAllServices(),
      api.packages.getAll(),
   ]);

   return (
      <StoreSetter
         appointments={appointments}
         packages={packages}
         services={services}
      />
   );
}
