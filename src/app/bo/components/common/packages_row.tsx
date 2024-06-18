"use client";

import { cn } from "~/lib/utils";
import CreatePackageDialog from "../dialogs/create_package_dialog";
import PackageCard from "../cards/package_card";
import type { Package } from "~/types/packages";

interface IPackagesRow {
   title: string;
   active: boolean;
   packages: Package[];
}

export default function PackagesRow({ title, active, packages }: IPackagesRow) {
   return (
      <article className="grid h-max gap-3">
         <div className="flex justify-between border-b border-bo-card-border pb-2">
            <h2 className="flex items-center gap-1 text-sm text-gray-400">
               <span
                  className={cn(
                     "inline-block aspect-square w-3 rounded",
                     active ? "bg-green-500" : "bg-gray-400",
                  )}
               />
               {title}
            </h2>
            <CreatePackageDialog active={active} />
         </div>
         {packages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
         ))}
      </article>
   );
}
