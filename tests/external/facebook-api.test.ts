import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
    it('should return a FacebookUser if token is valid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(
            axiosClient,
            env.facebokApi.clientId,
            env.facebokApi.clientSecret
        )

        const fbUser = await sut.loadUser({
            token: 'EAAItw88estMBAN4QQeiSZAOtIrur9IdAPSfYmeIU7ZBHh8PlroSUmx6t6l1Y5tD6kyTkKjAzZA9jSmg2mgUoYXX7p6DxEMlppgPYhp9w5VNbx2Xn2jqlvplscbciM8gyCTrDJSRZCyLuZAlUgZAOwUI7m80UUZCKVUtRoCzQl94Qxail9s58i0UgFy2DvfbM5tYH3fN6ykSIAZDZD',
        })

        expect(fbUser).toEqual({
            facebookId: '105663985602591',
            email: 'mongo_bhtdwgz_teste@tfbnw.net',
            name: 'Mongo Teste',
        })
    })

    it('should return undefined if token is invalid', async () => {
        const axiosClient = new AxiosHttpClient()
        const sut = new FacebookApi(
            axiosClient,
            env.facebokApi.clientId,
            env.facebokApi.clientSecret
        )

        const fbUser = await sut.loadUser({
            token: 'invalid-token',
        })

        expect(fbUser).toBeUndefined()
    })
})
