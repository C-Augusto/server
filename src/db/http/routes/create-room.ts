import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../connection.ts'
import { schema } from '../../schema/index.ts'
import { z } from 'zod/v4'

export const createRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/rooms', {
    schema: {
        body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        }),
    }
  }, async (request, reply) => {
    const { name, description } = request.body

    const result =  await db.insert (schema.rooms).values({
        name,
        description,
  }).returning()

  const insertedRoom = result[0]

  if (!insertedRoom) {
    throw new Error('Failed to create room')
    }
    return reply.status(201).send({ roomId: insertedRoom.id })
  })
}
