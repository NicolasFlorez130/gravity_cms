"use client";

import Loading from "~/components/shared/loading";
import { useBoPackagesContext } from "../../packages/hocs/bo_packages_context";
import {
   MinusCircle,
   Pencil,
   PlusCircle,
} from "@phosphor-icons/react/dist/ssr";

interface IActivity {}

export default function Activity({}: IActivity) {
   const { packagesActivity, packagesActivityLoading } = useBoPackagesContext();

   return (
      <div className="grid h-max w-full gap-4">
         <h2 className="mb-1 font-medium text-gray-700 underline">Actividad</h2>

         <div className="grid items-center gap-2">
            {packagesActivityLoading ? (
               <Loading />
            ) : (
               packagesActivity?.map(({ changeType }, i) => (
                  <div
                     key={i}
                     className="flex items-center gap-1 text-gray-700"
                  >
                     {(() => {
                        switch (changeType) {
                           case "CREATE":
                              return (
                                 <>
                                    <PlusCircle />
                                    <p>Se creó un paquete</p>
                                 </>
                              );
                           case "DELETE":
                              return (
                                 <>
                                    <MinusCircle />
                                    <p>Se eliminó un paquete</p>
                                 </>
                              );
                           case "EDIT":
                              return (
                                 <>
                                    <Pencil />
                                    <p>Se editó un paquete</p>
                                 </>
                              );
                        }
                     })()}
                  </div>
               ))
            )}
         </div>
      </div>
   );
}
