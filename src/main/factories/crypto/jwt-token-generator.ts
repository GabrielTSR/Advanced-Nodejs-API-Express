import { env } from '@/main/config/env'
import {} from '@/main/factories/repos'
import { JwtTokenGenerator } from '@/infra/crypto'
import { TokenGenerator } from '@/data/contracts/crypto'

export const makeJwtTokenGenerator = (): TokenGenerator => {
    return new JwtTokenGenerator(env.jwtSecret)
}
