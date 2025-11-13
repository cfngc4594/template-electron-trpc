import { TRPCError } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import { shell } from 'electron'
import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'

export const oauthRouter = createTRPCRouter({
  openExternalUrl: baseProcedure
    .input(z.object({ url: z.url() }))
    .mutation(async ({ input }) => {
      try {
        await shell.openExternal(input.url)
        return { success: true }
      }
      catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to open external URL',
          cause: error,
        })
      }
    }),
  onProtocolUrl: baseProcedure
    .subscription(({ ctx }) => {
      return observable<string>((emit) => {
        try {
          const handler = (url: string) => {
            try {
              emit.next(url)
            }
            catch (error) {
              emit.error(
                new TRPCError({
                  code: 'INTERNAL_SERVER_ERROR',
                  message: 'Failed to emit protocol URL',
                  cause: error,
                }),
              )
            }
          }

          ctx.protocolUrlEmitter.on('protocol-url', handler)

          return () => {
            ctx.protocolUrlEmitter.off('protocol-url', handler)
          }
        }
        catch (error) {
          emit.error(
            new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to setup protocol URL listener',
              cause: error,
            }),
          )
        }
      })
    }),
})
