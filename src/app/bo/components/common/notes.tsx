"use client";

import { subDays } from "date-fns";
import { Separator } from "~/components/bo/ui/separator";
import Loading from "~/components/shared/loading";
import { api } from "~/trpc/react";
import NoteCard from "../cards/note_card";
import { useRef } from "react";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import CreateNoteDialog from "../dialogs/create_note_dialog";

interface INotes {}

export default function Notes({}: INotes) {
   const today = useRef(subDays(new Date(), 1));

   const { data, refetch, isFetching, isRefetching } =
      api.notes.getActives.useQuery(today.current, {
         refetchOnWindowFocus: false,
      });

   return (
      <div className="grid w-full gap-4">
         <div>
            <div className="mb-1 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <PencilSimple
                     className="box-content rounded-md bg-gray-300 p-1 text-gray-700"
                     size={12}
                  />
                  <h2 className="font-medium text-gray-700 underline">
                     <span></span>
                     Notas especiales
                  </h2>
               </div>
               <CreateNoteDialog refetch={refetch} />
            </div>
            <Separator />
         </div>

         <div className="grid w-full place-items-center gap-2">
            {isFetching && !isRefetching ? (
               <Loading />
            ) : data ? (
               data.map(note => (
                  <NoteCard key={note.id} data={note} refetch={refetch} />
               ))
            ) : (
               <></>
            )}
         </div>
      </div>
   );
}
