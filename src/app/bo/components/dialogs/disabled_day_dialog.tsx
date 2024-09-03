"use client";

import { type PropsWithChildren } from "react";
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogTrigger,
} from "~/components/bo/ui/alert-dialog";
import { Button } from "~/components/bo/ui/button";
import Loading from "~/components/shared/loading";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import { api } from "~/trpc/react";

interface IDisabledDayDialog {
   id: string;
}

export function DisabledDayDialog({
   id,
   children,
}: PropsWithChildren<IDisabledDayDialog>) {
   const { refresh } = useRouterRefresh();

   const { mutate, isPending } = api.disabledDays.deleteDisableDate.useMutation(
      {
         onSuccess: refresh,
      },
   );

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
         <AlertDialogContent className="text-black">
            <div className="grid grid-cols-1 gap-2">
               <AlertDialogCancel disabled={isPending}>
                  Cerrar
               </AlertDialogCancel>
               <Button
                  className=""
                  variant="purple"
                  disabled={isPending}
                  onClick={() => mutate(id)}
               >
                  {isPending ? <Loading /> : "Habilitar día"}
               </Button>
            </div>
         </AlertDialogContent>
      </AlertDialog>
   );
}
