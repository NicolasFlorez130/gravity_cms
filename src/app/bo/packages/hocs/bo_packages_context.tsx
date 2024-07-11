"use client";

import { type PropsWithChildren, createContext, useContext } from "react";
import { api } from "~/trpc/react";
import type { IPackage, IPackageChange } from "~/types/packages";

interface BoPackagesContext {
   packages: IPackage[];
   refreshPackages: () => Promise<any>;
   packagesLoading: boolean;

   packagesActivity: IPackageChange[];
   packagesActivityLoading: boolean;
   refreshPackagesActivity: () => Promise<any>;
}

const BoPackagesContext = createContext<Partial<BoPackagesContext>>({});

export const useBoPackagesContext = () => useContext(BoPackagesContext);

export function BoPackagesContextProvider({ children }: PropsWithChildren) {
   const {
      data: packages,
      refetch: refreshPackages,
      isLoading: packagesLoading,
   } = api.packages.getAll.useQuery();

   const {
      data: packagesActivity,
      refetch: refreshPackagesActivity,
      isLoading: packagesActivityLoading,
   } = api.packages.getLastChanges.useQuery(4);

   return (
      <BoPackagesContext.Provider
         value={{
            packages,
            refreshPackages,
            packagesLoading,

            packagesActivity,
            refreshPackagesActivity,
            packagesActivityLoading,
         }}
      >
         {children}
      </BoPackagesContext.Provider>
   );
}
