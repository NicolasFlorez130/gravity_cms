"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/bo/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IPackage } from "~/types/packages";
import PackageForm from "../common/package_form";
import { insertPackageSchema } from "~/server/db/schemas/packages";
import { useBoPackagesContext } from "../../packages/hocs/bo_packages_context";

interface ICreatePackageDialog {
   active: boolean;
}

export default function CreatePackageDialog({ active }: ICreatePackageDialog) {
   const { refreshPackages, refreshPackagesActivity } = useBoPackagesContext();

   const [isOpen, setIsOpen] = useState(false);

   const { mutate: registerChange } =
      api.packages.registerNewChange.useMutation({
         onSuccess: refreshPackagesActivity,
      });

   const { mutate, isPending } = api.packages.create.useMutation({
      onSuccess: async data => {
         registerChange({
            packageId: data.at(0)?.id ?? "",
            changeType: "CREATE",
         });
         await refreshPackages?.();
         setIsOpen(false);
         form.reset();
      },
   });

   const form = useForm<IPackage>({
      resolver: zodResolver(insertPackageSchema),
      disabled: isPending,
      defaultValues: {
         active,
         forChildren: false,
         description: "",
         minutePrice: 0,
         name: "",
         usersQuantity: 1,
         price: 0,
      },
   });

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button size="icon" variant="secondary">
               <Plus size={10} />
            </Button>
         </DialogTrigger>
         <DialogContent className="grid h-max w-[30vw] max-w-lg gap-4 text-black">
            <DialogHeader>
               <DialogTitle className="text-xl font-semibold">
                  Crear paquete
               </DialogTitle>
            </DialogHeader>
            <PackageForm
               form={form}
               isPending={isPending}
               onSubmit={form.handleSubmit(data => mutate(data))}
               submitText="Crear"
            />
         </DialogContent>
      </Dialog>
   );
}
