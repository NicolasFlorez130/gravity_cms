import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const hoursRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) => ctx.db.query.hours.findMany()),
});
