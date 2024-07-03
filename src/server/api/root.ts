import { imagesRouter } from "~/server/api/routers/images";
import { appointmentsRouter } from "~/server/api/routers/appointments";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { packagesRouter } from "./routers/packages";
import { notesRouter } from "./routers/notes";
import { opinionsRouter } from "./routers/opinions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
   images: imagesRouter,
   appointments: appointmentsRouter,
   packages: packagesRouter,
   notes: notesRouter,
   opinions: opinionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
