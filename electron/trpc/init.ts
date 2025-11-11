import { initTRPC } from '@trpc/server'
import { cache } from 'react'
import superjson from 'superjson'

export const createTRPCContext = cache(async () => {
  return { }
})

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC
  .context<Context>()
  .create({ isServer: true, transformer: superjson })

export const createTRPCRouter = t.router

export const baseProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async (
  opts,
) => {
  const { ctx } = opts

  return opts.next({
    ctx: {
      ...ctx,
    },
  })
})
