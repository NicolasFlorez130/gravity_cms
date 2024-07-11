"use client";

import Image from "next/image";
import { Card } from "~/components/bo/ui/card";
import { cn, formatCurrency } from "~/lib/utils";
import type { IPackage, PackageChangeType } from "~/types/packages";
import AvailabilityChip from "../chips/availability_chip";
import { Chip } from "~/components/bo/ui/chip";
import { api } from "~/trpc/react";
import { Switch } from "~/components/bo/ui/switch";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "~/components/bo/ui/dropdown-menu";
import { Button } from "~/components/bo/ui/button";
import { DotsThree } from "@phosphor-icons/react/dist/ssr";
import UpdatePackageDialog from "../dialogs/update_package_dialog";
import { useBoPackagesContext } from "../../packages/hocs/bo_packages_context";

interface IPackageCard {
   pkg: IPackage;
}

export default function PackageCard({ pkg }: IPackageCard) {
   const { refreshPackages, refreshPackagesActivity } = useBoPackagesContext();

   const { mutate: registerChange } =
      api.packages.registerNewChange.useMutation({
         onSuccess: refreshPackagesActivity,
      });

   async function onSuccess(changeType: PackageChangeType) {
      registerChange({
         changeType: changeType,
         packageId: pkg.id,
      });
      await refreshPackages?.();
   }

   const { mutate: changeStatus, isPending: isChanging } =
      api.packages.updateStatus.useMutation({
         onSuccess: () => onSuccess("EDIT"),
      });

   const { mutate: deletePkg, isPending: isDeleting } =
      api.packages.deleteById.useMutation({
         onSuccess: () => onSuccess("DELETE"),
      });

   const isLoading = isChanging || isDeleting;

   return (
      <Card className={cn("grid gap-3 p-4 text-sm", isLoading && "opacity-50")}>
         <div className="flex justify-between">
            <div className="flex gap-2">
               {pkg.forChildren && (
                  <Chip className="bg-blue-100 text-blue-600">Niños</Chip>
               )}
               {pkg.usersQuantity > 1 ? (
                  <Chip className="bg-sky-100 text-sky-400">Grupo</Chip>
               ) : (
                  <Chip className="bg-violet-100 text-violet-600">
                     Individual
                  </Chip>
               )}
            </div>
            <div className="flex items-center gap-2">
               <Switch
                  disabled={isLoading}
                  checked={pkg.active}
                  onCheckedChange={active =>
                     changeStatus({ id: pkg.id, active })
                  }
               />
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="ghost"
                        disabled={isLoading}
                        className="h-max p-0"
                     >
                        <span className="sr-only">Abrir menú</span>
                        <DotsThree size={24} />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <UpdatePackageDialog data={pkg} />
                     <DropdownMenuItem onClick={() => deletePkg(pkg.id)}>
                        Eliminar
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
         <p className="flex items-center gap-1 font-bold text-gray-700">
            <Image src="/icons/paper.svg" alt="paper" width={16} height={16} />
            {formatCurrency(pkg.price)}
         </p>
         <div className="grid grid-cols-[1fr_auto] gap-3">
            <p className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-400">
               @ {pkg.name}
            </p>
            <AvailabilityChip value={pkg.availability} />
         </div>
      </Card>
   );
}
