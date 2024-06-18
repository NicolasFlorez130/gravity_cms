"use client";

import { Fragment } from "react";
import Loading from "~/components/shared/loading";
import { api } from "~/trpc/react";

interface IActivity {}

export default function Activity({}: IActivity) {
   const { data, isFetching, isRefetching } =
      api.appointments.getNextAppointments.useQuery(0, {
         // refetchOnWindowFocus: false,
      });

   return (
      <div className="grid h-max w-full gap-4">
         <h2 className="mb-1 font-medium text-gray-700 underline">Actividad</h2>

         <div className="grid place-items-center gap-2">
            {isFetching && !isRefetching ? (
               <Loading />
            ) : data ? (
               data.map((_, i) => <Fragment key={i} />)
            ) : (
               <></>
            )}
         </div>
      </div>
   );
}
