import StoreSetter from "~/components/shared/setters/store_setter";
import { api } from "~/trpc/server";

interface IGlobalsGetter {}

export default async function GlobalsGetter({}: IGlobalsGetter) {
   const [bookings, services, packages, disabledDates, hours] =
      await Promise.all([
         api.appointments.getAllConfirmed(),
         api.appointments.getAllServicesConfirmed(),
         api.packages.getAll(),
         api.disabledDays.getAllNext(),
         api.hours.getAll(),
      ]);

   return (
      <StoreSetter
         bookings={bookings.map(({ booking }) => booking)}
         packages={packages}
         appointments={services}
         disabledDates={disabledDates}
         hours={hours}
      />
   );
}
