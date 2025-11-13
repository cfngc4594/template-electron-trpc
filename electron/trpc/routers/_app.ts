import { createTRPCRouter } from '../init'
import { oauthRouter } from './oauth'

export const appRouter = createTRPCRouter({
  oauth: oauthRouter,
})

export type AppRouter = typeof appRouter
