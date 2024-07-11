"use client";

import PackagesRow from "../../components/common/packages_row";
import { useEffect, useMemo } from "react";
import Loading from "~/components/shared/loading";
import { useStore } from "~/lib/features/store";
import { useBoPackagesContext } from "../hocs/bo_packages_context";

interface IPackages {}

export default function Packages({}: IPackages) {
   const setPackages = useStore.use.setPackages();

   const { packages, packagesLoading } = useBoPackagesContext();

   useEffect(() => {
      if (packages) {
         setPackages(packages);
      }
   }, [packages, setPackages]);

   const activePackages = useMemo(
      () => packages?.filter(pkg => pkg.active) ?? [],
      [packages],
   );
   const inactivePackages = useMemo(
      () => packages?.filter(pkg => !pkg.active) ?? [],
      [packages],
   );

   return (
      <div className="grid h-max gap-5">
         <h2 className="text-4xl font-medium">Gestión de paquetes</h2>
         {packagesLoading ? (
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
   );
}
