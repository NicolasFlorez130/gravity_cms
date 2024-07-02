import {
   appointments,
   appointmentsPackages,
   bookAppointmentSchema,
} from "~/server/db/schemas/packages_appointments";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appointmentsRouter = createTRPCRouter({
   getAll: protectedProcedure.query(({ ctx }) =>
      ctx.db.query.appointments.findMany({
         orderBy: ({ date }, { desc }) => desc(date),
      }),
   ),

   getNextAppointments: protectedProcedure
      .input(z.number())
      .query(({ ctx, input }) =>
         ctx.db.query.appointments.findMany({
            where: ({ date, status }, { gt, and, eq }) =>
               and(gt(date, new Date()), eq(status, "PAID")),
            orderBy: ({ date }, { asc }) => asc(date),
            limit: input,
         }),
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

               await Promise.all(
                  input.packages.map(pkg =>
                     tx.insert(appointmentsPackages).values({
                        ...pkg,
                        appointmentId,
                     }),
                  ),
               );

               return appointmentId;
            } catch (error) {
               tx.rollback();

               throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
         }),
      ),

   updateStatus: protectedProcedure
      .input(
         z.object({
            id: z.string(),
            status: z.enum(["PAID", "PENDING", "ATTENDED", "CANCELED"]),
         }),
      )
      .mutation(({ ctx, input: { id, status } }) =>
         ctx.db
            .update(appointments)
            .set({ status })
            .where(eq(appointments.id, id)),
      ),
});
