import { makeJwtTokenHandler } from '@/main/factories/crypto'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import {
    FacebookAuthentication,
    setupFacebookAuthentication,
} from '@/domain/use-cases'

export const makeFacebookAuthenticationUseCase = (): FacebookAuthentication => {
    const jwtTokenGenerator = makeJwtTokenHandler()
    const pgUserAccountRepo = makePgUserAccountRepo()
    const fbApi = makeFacebookApi()
    return setupFacebookAuthentication(
        fbApi,
        pgUserAccountRepo,
        jwtTokenGenerator
    )
}
