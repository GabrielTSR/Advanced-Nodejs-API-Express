import { mock, MockProxy } from 'jest-mock-extended'
import { UnauthorizaredError } from '@/application/errors/http'
import { FacebookLoginController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validation'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'

describe('FacebookLoginController', () => {
    let sut: FacebookLoginController
    let facebookAuth: MockProxy<FacebookAuthentication>
    let token: string

    beforeAll(() => {
        token = 'any_token'
        facebookAuth = mock<FacebookAuthentication>()
        facebookAuth.perform.mockResolvedValue(new AccessToken('any_value'))
    })

    beforeEach(() => {
        sut = new FacebookLoginController(facebookAuth)
    })

    it('should build Validators correctly', async () => {
        const validators = sut.buildValidators({ token })

        expect(validators).toEqual([
            new RequiredStringValidator('any_token', 'token'),
        ])
    })

    it('should call FacebookAuthentication with correct params', async () => {
        await sut.handle({ token })

        expect(facebookAuth.perform).toHaveBeenCalledWith({
            token,
        })
        expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
    })

    it('should return 401 if token is authentication fails', async () => {
        facebookAuth.perform.mockResolvedValueOnce(new AuthenticationError())
        const httpResponse = await sut.handle({ token })

        expect(httpResponse).toEqual({
            statusCode: 401,
            data: new UnauthorizaredError(),
        })
    })

    it('should return 200 if token is authentication succeeds', async () => {
        const httpResponse = await sut.handle({ token })

        expect(httpResponse).toEqual({
            statusCode: 200,
            data: {
                accessToken: new AccessToken('any_value').value,
            },
        })
    })
})
