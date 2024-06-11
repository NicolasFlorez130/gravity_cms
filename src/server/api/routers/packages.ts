import { createTRPCRouter, publicProcedure } from "../trpc";

export const appointmentsRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) =>
      ctx.db.query.appointments.findMany(),
   ),
});
