import { AccessToken } from '@/domain/models';
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook';
import { TokenGenerator } from '@/data/contracts/crypto';
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos';
import { AuthenticationError } from '@/domain/errors';
import { FacebookAuthenticationService } from '@/data/services';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FacebookAuthenticationService', () => {
    let facebookApi: MockProxy<LoadFacebookUserApi>;
    let crypto: MockProxy<TokenGenerator>;
    let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>;
    let sut: FacebookAuthenticationService;
    const token = 'any_token';

    beforeEach(() => {
        facebookApi = mock<LoadFacebookUserApi>();
        facebookApi.loadUser.mockResolvedValue({
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId: 'any_fb_id',
        });
        userAccountRepo = mock();
        userAccountRepo.load.mockResolvedValue(undefined);
        userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' });
        crypto = mock();
        sut = new FacebookAuthenticationService(facebookApi, userAccountRepo, crypto);
    });

    it('should call loadFacebookUserApi with correct params', async () => {
        await sut.perform({ token });

        expect(facebookApi.loadUser).toHaveBeenCalledWith({ token });
        expect(facebookApi.loadUser).toHaveBeenCalledTimes(1);
    });

    it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
        facebookApi.loadUser.mockResolvedValueOnce(undefined);

        const authResult = await sut.perform({ token });

        expect(authResult).toEqual(new AuthenticationError());
    });

    it('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
        await sut.perform({ token });

        expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' });
        expect(userAccountRepo.load).toHaveBeenCalledTimes(1);
    });

    it('should create account with facebook data', async () => {
        userAccountRepo.load.mockResolvedValueOnce(undefined);

        await sut.perform({ token });

        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
            email: 'any_fb_email',
            name: 'any_fb_name',
            facebookId: 'any_fb_id',
        });
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1);
    });

    it('should not update account name', async () => {
        userAccountRepo.load.mockResolvedValueOnce({
            id: 'any_id',
            name: 'any_fb_name',
        });

        await sut.perform({ token });

        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId: 'any_fb_id',
        });
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1);
    });

    it('should update account name', async () => {
        userAccountRepo.load.mockResolvedValueOnce({
            id: 'any_id',
        });

        await sut.perform({ token });

        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId: 'any_fb_id',
        });
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1);
    });

    it('should call token generator with correct params', async () => {
        await sut.perform({ token });

        expect(crypto.generateToken).toHaveBeenCalledWith({
            key: 'any_account_id',
            expirationInMs: AccessToken.expirationInMs,
        });
        expect(crypto.generateToken).toHaveBeenCalledTimes(1);
    });
});
