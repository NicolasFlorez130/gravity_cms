import { z } from "~/lib/zod_lang";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { insertNoteSchema, notes } from "~/server/db/schemas/notes";
import { eq } from "drizzle-orm";

export const notesRouter = createTRPCRouter({
   getActives: protectedProcedure.input(z.date()).query(({ ctx, input }) =>
      ctx.db.query.notes.findMany({
         where: ({ discarded, activeUntil }, { and, eq, gte }) =>
            and(eq(discarded, false), gte(activeUntil, input)),
         orderBy: ({ activeUntil }, { asc }) => asc(activeUntil),
      }),
   ),

   create: protectedProcedure
      .input(insertNoteSchema)
      .mutation(({ ctx, input }) => ctx.db.insert(notes).values(input)),

   discardById: protectedProcedure
      .input(z.string())
      .mutation(({ ctx, input }) =>
         ctx.db
            .update(notes)
            .set({ discarded: true })
            .where(eq(notes.id, input)),
      ),
});
