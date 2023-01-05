import { createTRPCRouter } from "./trpc";
import { commenterRouter } from "./routers/commenter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  commenter: commenterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
