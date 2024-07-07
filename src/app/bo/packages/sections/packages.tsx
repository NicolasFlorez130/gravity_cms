"use client";

import { api } from "~/trpc/react";
import PackagesRow from "../../components/common/packages_row";
import { useEffect, useMemo } from "react";
import Loading from "~/components/shared/loading";
import React, { createContext, useContext } from "react";
import { useStore } from "~/lib/features/store";

const RefetchContext = createContext<() => any>(() => undefined);

export const useRefetch = () => useContext(RefetchContext);

interface IPackages {}

export default function Packages({}: IPackages) {
   const setPackages = useStore.use.setPackages();

   const { data, refetch, isLoading } = api.packages.getAll.useQuery();

   useEffect(() => {
      if (data) {
         setPackages(data);
      }
   }, [data, setPackages]);

   const activePackages = useMemo(
      () => data?.filter(pkg => pkg.active) ?? [],
      [data],
   );
   const inactivePackages = useMemo(
      () => data?.filter(pkg => !pkg.active) ?? [],
      [data],
   );

   return (
      <RefetchContext.Provider value={refetch}>
         <div className="grid h-max gap-5">
            <h2 className="text-4xl font-medium">Gestión de paquetes</h2>
            {isLoading ? (
               <Loading />
            ) : (
               <section className="grid grid-cols-2 gap-4">
                  <PackagesRow
                     title="Desactivados"
                     active={false}
                     packages={inactivePackages}
                  />
                  <PackagesRow
                     title="Activados"
                     active={true}
                     packages={activePackages}
                  />
               </section>
            )}
         </div>
      </RefetchContext.Provider>
   );
}
