"use client";

import { Button } from "~/components/bo/ui/button";
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/bo/ui/select";
import { availabilityOptions, parseEventForNumber } from "~/lib/utils";
import { Switch } from "~/components/bo/ui/switch";
import type { UseFormReturn } from "react-hook-form";
import type { Package } from "~/types/packages";
import type { FormEventHandler } from "react";

interface IPackageForm {
   form: UseFormReturn<Package>;
   isPending: boolean;
   onSubmit: FormEventHandler<HTMLFormElement> | undefined;
   submitText: string;
}

export default function PackageForm({
   form,
   isPending,
   onSubmit,
   submitText,
}: IPackageForm) {
   return (
      <div className="grid p-6 pt-0">
         <Form {...form}>
            <form className="grid gap-5" onSubmit={onSubmit}>
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Nombre</FormLabel>
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
                  name="availability"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Dias disponible</FormLabel>
                        <FormControl>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una opción..." />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {availabilityOptions.map(option => (
                                    <SelectItem
                                       key={option.value}
                                       value={option.value}
                                    >
                                       {option.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              value={field.value}
                              onChange={parseEventForNumber(field.onChange)}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="usersQuantity"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Cantidad de usuarios</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              value={field.value}
                              onChange={parseEventForNumber(field.onChange)}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="minutePrice"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Precio por minuto extra</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              value={field.value}
                              onChange={parseEventForNumber(field.onChange)}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="grid grid-cols-2">
                  <FormField
                     control={form.control}
                     name="active"
                     render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                           <FormLabel>Paquete activo</FormLabel>
                           <FormControl>
                              <Switch
                                 disabled={field.disabled}
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="forChildren"
                     render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                           <FormLabel>Para niños</FormLabel>
                           <FormControl>
                              <Switch
                                 disabled={field.disabled}
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>
               <Button disabled={isPending} type="submit" variant="purple">
                  {isPending ? <Loading /> : submitText}
               </Button>
            </form>
         </Form>
      </div>
   );
}
