import { appointmentConfirmations } from "~/server/db/schemas/appointments";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { asc, eq } from "drizzle-orm";
import { z } from "~/lib/zod_lang";
import { TRPCError } from "@trpc/server";
import type { api } from "~/trpc/server";
import { bookAppointmentSchema, bookings } from "~/server/db/schemas/bookings";
import { services } from "~/server/db/schemas/services";

export type InputObject = Parameters<typeof api.appointments.book>["0"];

export const appointmentsRouter = createTRPCRouter({
   getById: publicProcedure.input(z.string()).query(({ ctx, input }) =>
      ctx.db.transaction(async tx => {
         const booking = await tx
            .select()
            .from(bookings)
            .where(eq(bookings.id, input))
            .leftJoin(
               appointmentConfirmations,
               eq(bookings.id, appointmentConfirmations.bookingId),
            );

         const el = booking.at(0);

         if (!el) {
            return null;
         } else {
            const bookingServices = await tx
               .select()
               .from(services)
               .where(eq(services.bookingId, el.booking.id));

            return {
               ...el,
               services: bookingServices,
            };
         }
      }),
   ),

   getAllConfirmed: publicProcedure.query(({ ctx }) =>
      ctx.db
         .select()
         .from(appointmentConfirmations)
         .innerJoin(
            bookings,
            eq(appointmentConfirmations.bookingId, bookings.id),
         ),
   ),

   getAllServicesConfirmed: publicProcedure.query(({ ctx }) =>
      ctx.db
         .select()
         .from(services)
         .innerJoin(
            appointmentConfirmations,
            eq(services.bookingId, appointmentConfirmations.bookingId),
         )
         .innerJoin(bookings, eq(services.bookingId, bookings.id))
         .orderBy(asc(services.date)),
   ),

   book: publicProcedure
      .input(bookAppointmentSchema)
      .mutation(({ ctx, input }) =>
         ctx.db.transaction(async tx => {
            try {
               const appointmentReturning = await tx
                  .insert(bookings)
                  .values(input)
                  .returning({ id: bookings.id });

               const bookingId = appointmentReturning.at(-1)?.id;

               if (!bookingId) {
                  throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
               }

               await tx.insert(services).values(
                  input.packages.map(pkg => ({
                     ...pkg,
                     bookingId,
                  })),
               );

               return bookingId;
            } catch (error) {
               console.error(error);

               tx.rollback();

               throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
         }),
      ),

   markServiceAsAttended: protectedProcedure
      .input(z.string())
      .mutation(({ ctx, input }) =>
         ctx.db
            .update(services)
            .set({ attended: true })
            .where(eq(services.id, input)),
      ),
});
