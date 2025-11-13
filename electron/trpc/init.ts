import type { IpcMainInvokeEvent } from 'electron'
import { EventEmitter } from 'node:events'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

export const protocolUrlEmitter = new EventEmitter()

export function createTRPCContext(opts: { event: IpcMainInvokeEvent }) {
  return {
    event: opts.event,
    protocolUrlEmitter,
  }
}

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
