"use client";

import type { User } from "next-auth";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { Button } from "~/components/bo/ui/button";
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import Loading from "~/components/shared/loading";
import { useStore } from "~/lib/features/store";
import { formatDateInSpanish, translatePaymentMethod } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { Booking, Service } from "~/types/appointments";

interface IAppointmentDetailsDialog {
   serviceId: string;
}

export function AppointmentDetailsDialog({
   serviceId,
   children,
}: PropsWithChildren<IAppointmentDetailsDialog>) {
   const [isOpen, setIsOpen] = useState(false);

   const { data, refetch, isLoading } =
      api.appointments.getServiceById.useQuery(serviceId, {
         enabled: false,
         refetchOnWindowFocus: false,
      });

   useEffect(() => {
      if (isOpen && !data) {
         void refetch();
      }
   }, [data, isOpen, refetch]);

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent className="p-6 text-black">
            {isLoading || !data ? (
               <Loading />
            ) : (
               <Details data={data} refetch={refetch} />
            )}
         </DialogContent>
      </Dialog>
   );
}

interface IDetails {
   data: {
      service: Service;
      booking?: Booking;
      user?: User;
   };
   refetch: () => Promise<any>;
}

function Details({ data: { booking, service, user }, refetch }: IDetails) {
   const hours = useStore.use.hours();
   const packages = useStore.use.packages();
   const pkg = useMemo(
      () => packages.find(({ id }) => service.packageId === id),
      [service.packageId, packages],
   );

   const { mutate, isPending } =
      api.appointments.markServiceAsAttended.useMutation({
         onSuccess: async () => {
            await refetch();
         },
      });

   return (
      <div className="grid gap-4">
         <div className="flex items-center gap-2 text-gray-500">
            <p className="text-sm">
               {formatDateInSpanish(service.date)},{" "}
               {hours.find(({ id }) => id === service.hourId)?.displayValue}
            </p>
         </div>
         <div className="flex w-full items-center gap-2 truncate">
            <p className="w-full truncate text-lg font-medium">{pkg?.name}</p>
         </div>
         <div className="grid grid-cols-2 gap-2">
            <Property label="Nombres">{booking?.clientNames}</Property>
            <Property label="Correo electrónico">
               {booking?.clientEmail}
            </Property>
            <Property label="Número de teléfono">
               {booking?.clientPhoneNumber}
            </Property>
            <Property label="Método de pago">
               {booking?.paymentMethod &&
                  translatePaymentMethod(booking.paymentMethod)}
            </Property>
            <Property label="Estado">
               {service.attended ? "Atendido" : "Por atender"}
            </Property>
            {booking?.paymentMethod === "ONLINE" && (
               <Property label="Agendado por">{user?.name ?? "_"}</Property>
            )}
         </div>
         <Button
            disabled={isPending || !!service.attended}
            variant="purple"
            onClick={() => mutate(service.id)}
         >
            {isPending ? <Loading /> : "Marcar como atendido"}
         </Button>
      </div>
   );
}

interface IProperty {
   label: string;
}

function Property({ label, children }: PropsWithChildren<IProperty>) {
   return (
      <div className="grid w-full gap-1 truncate text-sm">
         <p className="font-medium">{label}</p>
         <p className="w-full truncate text-gray-500">{children}</p>
      </div>
   );
}
