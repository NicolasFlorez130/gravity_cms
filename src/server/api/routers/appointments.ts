import {
   appointments,
   appointmentsPackages,
   bookAppointmentSchema,
} from "~/server/db/schemas/packages_appointments";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, asc, eq, gt } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appointmentsRouter = createTRPCRouter({
   getAll: protectedProcedure.query(({ ctx }) =>
      ctx.db.query.appointments.findMany(),
   ),

   getAllPopulated: protectedProcedure.query(({ ctx }) =>
      ctx.db
         .select()
         .from(appointmentsPackages)
         .innerJoin(
            appointments,
            eq(appointmentsPackages.appointmentId, appointments.id),
         )
         .orderBy(asc(appointmentsPackages.date)),
   ),

   getNextAppointments: protectedProcedure
      .input(z.number())
      .query(({ ctx, input }) =>
         ctx.db
            .select()
            .from(appointmentsPackages)
            .innerJoin(
               appointments,
               eq(appointmentsPackages.appointmentId, appointments.id),
            )
            .where(and(gt(appointmentsPackages.date, new Date())))
            .orderBy(asc(appointmentsPackages.date))
            .limit(input),
      ),

   book: protectedProcedure
      .input(bookAppointmentSchema)
      .mutation(({ ctx, input }) =>
         ctx.db.transaction(async tx => {
            try {
               const appointmentReturning = await tx
                  .insert(appointments)
                  .values(input)
                  .returning({ id: appointments.id });

               const appointmentId = appointmentReturning.at(-1)?.id;

               if (!appointmentId) {
                  throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
               }

               await tx.insert(appointmentsPackages).values(
                  input.packages.map(pkg => ({
                     ...pkg,
                     appointmentId,
                  })),
               );

               return appointmentId;
            } catch (error) {
               console.error(error);

               tx.rollback();

               throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
         }),
      ),

   updateStatus: protectedProcedure
      .input(
         z.object({
            id: z.string(),
            status: z.enum(["PAID", "PENDING", "CANCELED"]),
         }),
      )
      .mutation(({ ctx, input: { id, status } }) =>
         ctx.db
            .update(appointments)
            .set({ status })
            .where(eq(appointments.id, id)),
      ),

   markAsAttended: protectedProcedure
      .input(z.string())
      .mutation(({ ctx, input }) =>
         ctx.db
            .update(appointmentsPackages)
            .set({ attended: true })
            .where(eq(appointments.id, input)),
      ),
});
