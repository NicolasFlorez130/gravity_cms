"use client";

import { FileText } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { Card } from "~/components/bo/ui/card";
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { Note } from "~/types/notes";

interface INoteCard {
   data: Note;
   refetch: () => Promise<any>;
}

export default function NoteCard({ data, refetch }: INoteCard) {
   const router = useRouter();

   const { isPending } = api.notes.discardById.useMutation({
      onSuccess: async () => {
         router.refresh();
         await refetch();
      },
   });

   //This is gonna be part of a dialog at some point, thats way is modularized
   function Content({ isDialog }: { isDialog?: boolean }) {
      return (
         <div className="grid w-full gap-2 text-black">
            <div className="flex items-center gap-2 text-gray-500">
               <FileText />
               <p className="text-xs">{data.activeUntil.toDateString()}</p>
            </div>
            <div className="flex w-full items-center gap-2 truncate">
               <p className="w-full truncate text-sm font-medium">
                  {data.title} {data.title} {data.title} {data.title}
               </p>
            </div>
            <div className="grid justify-between gap-2 p-0 text-xs text-gray-500">
               <p className={cn("w-full", !isDialog ? "truncate" : "break-all")}>
                  {data.description}
               </p>
               {isDialog && <p>Creada el: {data.activeUntil.toDateString()}</p>}
            </div>
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
         <DialogContent>
            <Content isDialog />
         </DialogContent>
      </Dialog>
   );
}
