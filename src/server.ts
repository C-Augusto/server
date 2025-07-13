import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getRoomsRoute } from './db/http/routes/get-rooms.ts'
import { env } from './env.ts'
import { createRoomsRoute } from './db/http/routes/create-room.ts'
import { getRoomsQuestions } from './db/http/routes/get-room-questions.ts'
import { createQuestionRoute } from './db/http/routes/create-question.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)
app.register(createRoomsRoute)
app.register(getRoomsQuestions)
app.register(createQuestionRoute)

app.listen({ port: env.PORT })
