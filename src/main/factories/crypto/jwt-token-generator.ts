import { env } from '@/main/config/env'
import {} from '@/main/factories/repos'
import { JwtTokenHandler } from '@/infra/crypto'
import { TokenGenerator } from '@/domain/contracts/crypto'

export const makeJwtTokenGenerator = (): TokenGenerator => {
    return new JwtTokenHandler(env.jwtSecret)
}
