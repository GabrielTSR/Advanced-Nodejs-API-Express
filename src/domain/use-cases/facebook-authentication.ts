import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import {
    LoadUserAccountRepository,
    SaveFacebookAccountRepository,
} from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Setup = (
    facebookApi: LoadFacebookUserApi,
    userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
    crypto: TokenGenerator
) => FacebookAuthentication
type Params = { token: string }
type Result = { accessToken: string }
export type FacebookAuthentication = (params: Params) => Promise<Result>

export const setupFacebookAuthentication: Setup =
    (facebookApi, userAccountRepo, crypto) => async (params) => {
        const fbData = await facebookApi.loadUser(params)
        if (fbData) {
            const accountData = await userAccountRepo.load({
                email: fbData?.email,
            })
            const fbAccount = new FacebookAccount(fbData, accountData)
            const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
            const accessToken = await crypto.generateToken({
                key: id,
                expirationInMs: AccessToken.expirationInMs,
            })
            return { accessToken }
        }
        throw new AuthenticationError()
    }
