import { createTRPCRouter, publicProcedure } from "../trpc";

export const packagesRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) =>
      ctx.db.query.appointments.findMany(),
   ),
});
