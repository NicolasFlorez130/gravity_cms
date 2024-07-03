import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) => ctx.db.query.images.findMany()),
   getAllSeparated: publicProcedure.query(({ ctx }) => ctx.db.query.images.findMany())
});
