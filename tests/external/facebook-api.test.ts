import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
    let axiosClient: AxiosHttpClient
    let sut: FacebookApi

    beforeEach(() => {
        axiosClient = new AxiosHttpClient()
        sut = new FacebookApi(
            axiosClient,
            env.facebokApi.clientId,
            env.facebokApi.clientSecret
        )
    })
    it('should return a FacebookUser if token is valid', async () => {
        const fbUser = await sut.loadUser({
            token: env.facebokApi.token,
        })

        expect(fbUser).toEqual({
            facebookId: '105663985602591',
            email: 'mongo_bhtdwgz_teste@tfbnw.net',
            name: 'Mongo Teste',
        })
    })

    it('should return undefined if token is invalid', async () => {
        const fbUser = await sut.loadUser({
            token: 'invalid-token',
        })

        expect(fbUser).toBeUndefined()
    })
})
