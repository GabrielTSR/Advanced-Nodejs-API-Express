import { mock, MockProxy } from 'jest-mock-extended'
import { AccessToken } from '@/domain/entities'
import { LoadFacebookUserApi } from '@/domain/contracts/apis/facebook'
import { TokenGenerator } from '@/domain/contracts/crypto'
import {
    LoadUserAccountRepository,
    SaveFacebookAccountRepository,
} from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'
import {
    FacebookAuthentication,
    setupFacebookAuthentication,
} from '@/domain/use-cases'

describe('FacebookAuthentication', () => {
    let facebookApi: MockProxy<LoadFacebookUserApi>
    let crypto: MockProxy<TokenGenerator>
    let userAccountRepo: MockProxy<
        LoadUserAccountRepository & SaveFacebookAccountRepository
    >
    let sut: FacebookAuthentication
    let token: string

    beforeAll(() => {
        token = 'any_token'
        facebookApi = mock<LoadFacebookUserApi>()
        facebookApi.loadUser.mockResolvedValue({
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId: 'any_fb_id',
        })
        userAccountRepo = mock()
        userAccountRepo.load.mockResolvedValue(undefined)
        userAccountRepo.saveWithFacebook.mockResolvedValue({
            id: 'any_account_id',
        })
        crypto = mock()
        crypto.generateToken.mockResolvedValue('any_generated_token')
    })

    beforeEach(() => {
        sut = setupFacebookAuthentication(facebookApi, userAccountRepo, crypto)
    })

    it('should call loadFacebookUserApi with correct input', async () => {
        await sut({ token })

        expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
        expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should throw AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
        facebookApi.loadUser.mockResolvedValueOnce(undefined)

        const promise = sut({ token })

        await expect(promise).rejects.toThrow(new AuthenticationError())
    })

    it('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
        await sut({ token })

        expect(userAccountRepo.load).toHaveBeenCalledWith({
            email: 'any_fb_email',
        })
        expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
    })

    it('should create account with facebook data', async () => {
        userAccountRepo.load.mockResolvedValueOnce(undefined)

        await sut({ token })

        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
            email: 'any_fb_email',
            name: 'any_fb_name',
            facebookId: 'any_fb_id',
        })
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should not update account name', async () => {
        userAccountRepo.load.mockResolvedValueOnce({
            id: 'any_id',
            name: 'any_fb_name',
        })

        await sut({ token })

        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId: 'any_fb_id',
        })
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should update account name', async () => {
        userAccountRepo.load.mockResolvedValueOnce({
            id: 'any_id',
        })

        await sut({ token })

        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId: 'any_fb_id',
        })
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
    })

    it('should call token generator with correct input', async () => {
        await sut({ token })

        expect(crypto.generateToken).toHaveBeenCalledWith({
            key: 'any_account_id',
            expirationInMs: AccessToken.expirationInMs,
        })
        expect(crypto.generateToken).toHaveBeenCalledTimes(1)
    })

    it('should return and AccessToken on success', async () => {
        const authOutput = await sut({ token })

        expect(authOutput).toEqual({ accessToken: 'any_generated_token' })
    })

    it('should rethrow if LoadFacebookApi throws', async () => {
        facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))

        const promise = sut({ token })

        await expect(promise).rejects.toThrow(new Error('fb_error'))
    })

    it('should rethrow if LoadUserAccountRepository throws', async () => {
        userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))

        const promise = sut({ token })

        await expect(promise).rejects.toThrow(new Error('load_error'))
    })

    it('should rethrow if SaveFacebookAccountRepository throws', async () => {
        userAccountRepo.saveWithFacebook.mockRejectedValueOnce(
            new Error('save_error')
        )

        const promise = sut({ token })

        await expect(promise).rejects.toThrow(new Error('save_error'))
    })

    it('should rethrow if TokenGenerator throws', async () => {
        crypto.generateToken.mockRejectedValueOnce(new Error('token_error'))

        const promise = sut({ token })

        await expect(promise).rejects.toThrow(new Error('token_error'))
    })
})
