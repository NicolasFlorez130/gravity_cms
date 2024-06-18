"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPackageSchema } from "~/server/db/schemas/packages_appointments";
import type { Package } from "~/types/packages";
import PackageForm from "../common/package_form";
import { useRefetch } from "../../packages/sections/packages";
import { DropdownMenuItem } from "~/components/bo/ui/dropdown-menu";

interface IUpdatePackageDialog {
   data: Package;
}

export default function UpdatePackageDialog({ data }: IUpdatePackageDialog) {
   const refetch = useRefetch();

   const [isOpen, setIsOpen] = useState(false);

   const { mutate, isPending } = api.packages.update.useMutation({
      onSuccess: async () => {
         await refetch();
         setIsOpen(false);
         form.reset();
      },
   });

   const form = useForm<Package>({
      resolver: zodResolver(insertPackageSchema),
      disabled: isPending,
      
      defaultValues: {
         ...data,
      },
   });

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger
            onClick={e => {
               e.preventDefault();
               setTimeout(() => setIsOpen(true), 100);
            }}
            asChild
         >
            <DropdownMenuItem>Editar</DropdownMenuItem>
         </DialogTrigger>
         <DialogContent className="grid h-max w-[30vw] max-w-lg gap-4 text-black">
            <DialogHeader>
               <DialogTitle className="text-xl font-semibold">
                  Editar paquete
               </DialogTitle>
            </DialogHeader>
            <PackageForm
               form={form}
               isPending={isPending}
               onSubmit={form.handleSubmit(data => mutate(data))}
               submitText="Actualizar"
            />
         </DialogContent>
      </Dialog>
   );
}
