import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const opinionsRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) => ctx.db.query.opinions.findMany()),
});
