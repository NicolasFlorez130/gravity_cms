import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { images } from "~/server/db/schemas";

export const imagesRouter = createTRPCRouter({
   // hello: publicProcedure
   //    .input(z.object({ text: z.string() }))
   //    .query(({ input }) => {
   //       return {
   //          greeting: `Hello ${input.text}`,
   //       };
   //    }),

   // create: protectedProcedure
   //    .input(z.object({ name: z.string().min(1) }))
   //    .mutation(async ({ ctx, input }) => {
   //       // simulate a slow db call
   //       await new Promise(resolve => setTimeout(resolve, 1000));

   //       await ctx.db.insert(images).values({
   //          name: input.name,
   //          createdById: ctx.session.user.id,
   //       });
   //    }),

   // getLatest: publicProcedure.query(({ ctx }) => {
   //    return ctx.db.query.images.findFirst({
   //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
   //    });
   // }),

   getAll: publicProcedure.query(({ ctx }) => ctx.db.query.images.findMany()),
});
