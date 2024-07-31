"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/bo/ui/button";
import { DatePicker } from "~/components/bo/ui/date_picker";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { InsertNote } from "~/types/notes";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "~/components/bo/ui/form";
import Loading from "~/components/shared/loading";
import { Input } from "~/components/bo/ui/input";
import { Textarea } from "~/components/bo/ui/textarea";
import { insertNoteSchema } from "~/server/db/schemas/notes";
import { onChangeSetDateToMidnight } from "~/lib/utils";

interface ICreateNoteDialog {
   refetch: () => Promise<any>;
}

export default function CreateNoteDialog({ refetch }: ICreateNoteDialog) {
   const [isOpen, setIsOpen] = useState(false);

   const { mutate, isPending } = api.notes.create.useMutation({
      onSuccess: async () => {
         await refetch();
         setIsOpen(false);
         form.reset();
      },
   });

   const form = useForm<InsertNote>({
      resolver: zodResolver(insertNoteSchema),
      defaultValues: {
         description: "",
         title: "",
      },
      disabled: isPending,
   });

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button
               size="icon"
               className="bg-blue-200 text-blue-500 hover:bg-blue-100"
            >
               <Plus size={10} />
            </Button>
         </DialogTrigger>
         <DialogContent className="grid h-max w-[30vw] max-w-lg gap-6 text-black">
            <DialogHeader>
               <DialogTitle>Crear nota</DialogTitle>
            </DialogHeader>
            <div className="grid p-6 pt-0">
               <Form {...form}>
                  <form
                     className="grid gap-5"
                     onSubmit={form.handleSubmit(data => mutate(data))}
                  >
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Título</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    value={field.value}
                                    onChange={field.onChange}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Descripción</FormLabel>
                              <FormControl>
                                 <Textarea className="resize-none" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="activeUntil"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Duración</FormLabel>
                              <FormControl>
                                 <DatePicker
                                    disabled={field.disabled}
                                    className="w-full"
                                    date={field.value}
                                    setDate={onChangeSetDateToMidnight(
                                       field.onChange,
                                    )}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button
                        disabled={isPending}
                        type="submit"
                        variant="purple"
                     >
                        {isPending ? <Loading /> : <>Crear</>}
                     </Button>
                  </form>
               </Form>
            </div>
         </DialogContent>
      </Dialog>
   );
}
