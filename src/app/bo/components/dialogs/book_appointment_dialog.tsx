"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "~/components/bo/ui/button";
import { Card } from "~/components/bo/ui/card";
import { DatePicker } from "~/components/bo/ui/date_picker";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "~/components/bo/ui/form";
import { Input } from "~/components/bo/ui/input";
import { Label } from "~/components/bo/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
} from "~/components/bo/ui/select";
import Loading from "~/components/shared/loading";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import {
   formatCurrency,
   parseDateToMidnightStartOfDay,
   parseEventForNumber,
   translatePaymentMethod,
   verifyAvailability,
} from "~/lib/utils";
import {
   bookAppointmentSchema,
   paymentMethods,
} from "~/server/db/schemas/packages_appointments";
import { api } from "~/trpc/react";
import type { IPackage } from "~/types/packages";

interface IBookAppointmentDialog {}

export default function BookAppointmentDialog({}: IBookAppointmentDialog) {
   const [isOpen, setIsOpen] = useState(false);

   const { refresh } = useRouterRefresh();

   const { data: packages, isLoading } =
      api.packages.getActivePackages.useQuery();

   const { mutate, isPending } = api.appointments.book.useMutation({
      onSuccess: async () => {
         await refresh();
         setIsOpen(false);
      },
   });

   type InputObject = Parameters<typeof mutate>["0"];

   const form = useForm<InputObject>({
      resolver: zodResolver(bookAppointmentSchema),
      defaultValues: {
         reference: "",
         status: "PENDING"
      },
      disabled: isPending,
   });

   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "packages",
   });

   const [totalSum, setTotalSum] = useState(0);

   function updateTotalSum() {
      const pkgs = new Map<string, IPackage>();

      packages?.map(pkg => pkgs.set(pkg.id, pkg));

      let sum = 0;

      form.getValues().packages?.forEach(el => {
         const pkg = pkgs.get(el.packageId);

         sum += pkg ? pkg.price + pkg.minutePrice * (el.extraMinutes ?? 0) : 0;
      });

      setTotalSum(sum);
   }

   function updateDaySelected(i: number) {
      form.setValue(`packages.${i}.packageId`, "");
   }

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button variant="purple">Crear reserva</Button>
         </DialogTrigger>
         <DialogContent className="grid h-max max-h-[80vh] w-[40vw] max-w-lg gap-4 overflow-auto text-black">
            <DialogHeader>
               <DialogTitle className="text-base font-medium">
                  Crear reserva
               </DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(
                     data => mutate(data),
                     console.log,
                  )}
                  className="grid gap-5 p-6 pt-0"
               >
                  <FormField
                     control={form.control}
                     name="clientNames"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nombres del cliente</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="clientPhoneNumber"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Teléfono del cliente</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="clientEmail"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email del cliente</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <Label>Paquetes</Label>
                        <Button
                           aria-label="append package"
                           type="button"
                           variant="secondary"
                           size="icon"
                           onClick={() =>
                              append({
                                 packageId: "",
                                 extraMinutes: undefined as unknown as number,
                                 date: new Date(),
                              })
                           }
                        >
                           <Plus />
                        </Button>
                     </div>
                     <div className="grid gap-4 rounded-lg bg-gray-50 p-2">
                        {fields.map((row, i) => (
                           <Card
                              key={i}
                              className="grid w-full grid-cols-[auto_1fr] gap-2 p-2"
                           >
                              <Button
                                 aria-label="delete package"
                                 type="button"
                                 className="bg-destructive text-white hover:bg-destructive/80"
                                 onClick={() => remove(i)}
                              >
                                 <Trash />
                              </Button>
                              <FormField
                                 control={form.control}
                                 name={`packages.${i}.date`}
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Fecha</FormLabel>
                                       <FormControl>
                                          <DatePicker
                                             disabled={field.disabled}
                                             className="w-full"
                                             date={field.value}
                                             setDate={parseDateToMidnightStartOfDay(
                                                field.onChange,
                                                () => updateDaySelected(i),
                                             )}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name={`packages.${i}.packageId`}
                                 render={({ field }) => (
                                    <FormItem>
                                       <Select
                                          {...field}
                                          onValueChange={props => {
                                             field.onChange(props);
                                             updateTotalSum();
                                          }}
                                          defaultValue={field.value}
                                          disabled={
                                             isLoading ||
                                             !row.date ||
                                             field.disabled
                                          }
                                       >
                                          <FormControl>
                                             <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un paquete" />
                                             </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                             {packages
                                                ?.filter(
                                                   ({ availability }) =>
                                                      row.date &&
                                                      verifyAvailability(
                                                         availability,
                                                         row.date,
                                                      ),
                                                )
                                                .map(pkg => (
                                                   <SelectItem
                                                      key={pkg.id}
                                                      value={pkg.id}
                                                   >
                                                      {pkg.name}
                                                   </SelectItem>
                                                ))}
                                          </SelectContent>
                                       </Select>
                                       <FormMessage className="text-end" />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name={`packages.${i}.extraMinutes`}
                                 render={({ field }) => (
                                    <FormItem className="col-span-2 flex w-full items-center justify-between gap-2 space-y-0">
                                       <FormLabel className="flex-none">
                                          Minutos extra
                                       </FormLabel>
                                       <div className="grid w-full gap-3">
                                          <FormControl>
                                             <Input
                                                {...field}
                                                value={field.value ?? undefined}
                                                onChange={parseEventForNumber(
                                                   field.onChange,
                                                   updateTotalSum,
                                                )}
                                                min={0}
                                                className="max-w-40 justify-self-end"
                                             />
                                          </FormControl>
                                          <FormMessage className="w-full text-end" />
                                       </div>
                                    </FormItem>
                                 )}
                              />
                           </Card>
                        ))}
                     </div>
                  </div>
                  <FormField
                     control={form.control}
                     name={"paymentMethod"}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Método de pago</FormLabel>
                           <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un método" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {paymentMethods
                                    .map(method => ({
                                       key: method,
                                       label: translatePaymentMethod(method),
                                    }))
                                    .map(
                                       method =>
                                          method.key !== "LANDING" && (
                                             <SelectItem
                                                key={method.key}
                                                value={method.key}
                                             >
                                                {method.label}
                                             </SelectItem>
                                          ),
                                    )}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name={"totalAmount"}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Total a pagar</FormLabel>
                           <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                              <FormControl>
                                 <Input
                                    {...field}
                                    onChange={parseEventForNumber(
                                       field.onChange,
                                    )}
                                    min={0}
                                 />
                              </FormControl>
                              <Button
                                 type="button"
                                 variant="secondary"
                                 onClick={() =>
                                    form.setValue("totalAmount", totalSum)
                                 }
                              >
                                 {formatCurrency(totalSum)}
                              </Button>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <DialogFooter>
                     <Button
                        disabled={isPending}
                        type="submit"
                        variant="purple"
                     >
                        {isPending ? <Loading /> : <>Guardar</>}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
