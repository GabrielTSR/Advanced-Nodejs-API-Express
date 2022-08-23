import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { FacebookAuthenticationService } from '@/data/services'

export const makeFacebookAuthenticationService =
    (): FacebookAuthenticationService => {
        const jwtTokenGenerator = makeJwtTokenGenerator()
        const pgUserAccountRepo = makePgUserAccountRepo()
        const fbApi = makeFacebookApi()
        return new FacebookAuthenticationService(
            fbApi,
            pgUserAccountRepo,
            jwtTokenGenerator
        )
    }
