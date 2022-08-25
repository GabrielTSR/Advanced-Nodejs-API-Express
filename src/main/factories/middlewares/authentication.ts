import { makeJwtTokenHandler } from '../crypto/jwt-token-handler'
import { AuthenticationMiddleware } from '@/application/middlewares'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
    const jwt = makeJwtTokenHandler()
    return new AuthenticationMiddleware(jwt.validateToken.bind(jwt))
}
