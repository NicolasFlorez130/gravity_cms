import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "~/lib/zod_lang";

export const usersRouter = createTRPCRouter({
   getById: protectedProcedure.input(z.string()).query(({ ctx, input }) =>
      ctx.db.query.users.findFirst({
         where: ({ id }) => eq(id, input),
      }),
   ),
});
