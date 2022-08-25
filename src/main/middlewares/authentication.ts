import { makeAuthenticationMiddleware } from '@/main/factories/middlewares'
import { adaptExpressMiddleware } from '@/main/adapters/express-middleware'

export const auth = adaptExpressMiddleware(makeAuthenticationMiddleware())
