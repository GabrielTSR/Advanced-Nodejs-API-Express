import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { FacebookAuthenticationUseCase } from '@/domain/use-cases'

export const makeFacebookAuthenticationUseCase =
    (): FacebookAuthenticationUseCase => {
        const jwtTokenGenerator = makeJwtTokenGenerator()
        const pgUserAccountRepo = makePgUserAccountRepo()
        const fbApi = makeFacebookApi()
        return new FacebookAuthenticationUseCase(
            fbApi,
            pgUserAccountRepo,
            jwtTokenGenerator
        )
    }
