import { TokenValidator } from '@/domain/contracts/crypto'

type Setup = (crypto: TokenValidator) => Authorize
export type Authorize = (input: Input) => Promise<Output>
type Input = { token: string }
type Output = string

export const setupAuthorize: Setup = (crypto) => async (input) => {
    const userId = await crypto.validateToken(input)
    return userId
}
