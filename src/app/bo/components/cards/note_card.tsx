"use client";

import { FileText } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { Button } from "~/components/bo/ui/button";
import { Card } from "~/components/bo/ui/card";
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import Loading from "~/components/shared/loading";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { Note } from "~/types/notes";

interface INoteCard {
   data: Note;
   refetch: () => Promise<any>;
}

export default function NoteCard({ data, refetch }: INoteCard) {
   const router = useRouter();

   const { mutate, isPending } = api.notes.discardById.useMutation({
      onSuccess: async () => {
         router.refresh();
         await refetch();
      },
   });

   function Content({ isDialog }: { isDialog?: boolean }) {
      return (
         <div className={cn("grid w-full gap-2 text-black")}>
            <div className="flex items-center gap-2 text-gray-500">
               <FileText />
               <p className={cn(isDialog ? "text-sm" : "text-xs")}>
                  {data.activeUntil.toDateString()}
               </p>
            </div>
            <div className="flex w-full items-center gap-2 truncate">
               <p
                  className={cn(
                     "w-full truncate font-medium",
                     !isDialog && "text-sm",
                  )}
               >
                  {data.title}
               </p>
            </div>
            <div
               className={cn(
                  "grid justify-between gap-1 p-0 text-gray-500",
                  isDialog ? "text-sm" : "text-xs",
               )}
            >
               <p
                  className={cn("w-full", !isDialog ? "truncate" : "break-all")}
               >
                  {data.description}
               </p>
            </div>
            {isDialog && (
               <>
                  <p
                     className={cn(
                        "text-gray-500",
                        isDialog ? "text-sm" : "text-xs",
                     )}
                  >
                     Creada el: {data.createdAt.toDateString()}
                  </p>
                  <Button
                     className="mt-4"
                     disabled={isPending}
                     variant="purple"
                     onClick={() => mutate(data.id)}
                  >
                     {isPending ? <Loading /> : <>Eliminar</>}
                  </Button>
               </>
            )}
         </div>
      );
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Card
               className={cn(
                  " w-full cursor-pointer border-bo-card-border p-3",
                  isPending && "opacity-50",
               )}
            >
               <Content />
            </Card>
         </DialogTrigger>
         <DialogContent className="p-6">
            <Content isDialog />
         </DialogContent>
      </Dialog>
   );
}
