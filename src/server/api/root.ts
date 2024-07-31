import { imagesRouter } from "~/server/api/routers/images";
import { appointmentsRouter } from "~/server/api/routers/appointments";
import {
   createCallerFactory,
   createTRPCRouter,
   publicProcedure,
} from "~/server/api/trpc";
import { packagesRouter } from "./routers/packages";
import { notesRouter } from "./routers/notes";
import { opinionsRouter } from "./routers/opinions";
import { disabledDaysRouter } from "./routers/disabled_days";
import { hoursRouter } from "./routers/hours";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
   getSession: publicProcedure.query(({ ctx: { session } }) => session),
   images: imagesRouter,
   appointments: appointmentsRouter,
   packages: packagesRouter,
   notes: notesRouter,
   opinions: opinionsRouter,
   disabledDays: disabledDaysRouter,
   hours: hoursRouter,
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
