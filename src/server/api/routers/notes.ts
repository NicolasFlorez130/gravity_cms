import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { insertNoteSchema, notes } from "~/server/db/schemas/notes";
import { eq } from "drizzle-orm";

//TODO: Change all procedures to private ones
export const notesRouter = createTRPCRouter({
   getActives: publicProcedure.input(z.date()).query(({ ctx, input }) =>
      ctx.db.query.notes.findMany({
         where: ({ discarded, activeUntil }, { and, eq, gte }) =>
            and(eq(discarded, false), gte(activeUntil, input)),
         orderBy: ({ activeUntil }, { asc }) => asc(activeUntil),
      }),
   ),

   create: publicProcedure
      .input(insertNoteSchema)
      .mutation(({ ctx, input }) => ctx.db.insert(notes).values(input)),

   discardById: publicProcedure
      .input(z.string())
      .mutation(({ ctx, input }) =>
         ctx.db
            .update(notes)
            .set({ discarded: true })
            .where(eq(notes.id, input)),
      ),
});
