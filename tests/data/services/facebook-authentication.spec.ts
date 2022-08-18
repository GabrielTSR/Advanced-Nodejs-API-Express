import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook';
import { LoadUserAccountRepository } from '@/data/contracts/repos';
import { AuthenticationError } from '@/domain/errors';
import { FacebookAuthenticationService } from '@/data/services';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FacebookAuthenticationService', () => {
    let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
    let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>;
    let sut: FacebookAuthenticationService;
    const token = 'any_token';
    beforeEach(() => {
        loadFacebookUserApi = mock<LoadFacebookUserApi>();
        loadFacebookUserApi.loadUser.mockResolvedValue({
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebokId: 'any_fb_id',
        });
        loadUserAccountRepo = mock();
        sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserAccountRepo);
    });

    it('should call loadFacebookUserApi with correct params', async () => {
        await sut.perform({ token });

        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token });
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
    });

    it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);

        const authResult = await sut.perform({ token });

        expect(authResult).toEqual(new AuthenticationError());
    });

    it('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
        await sut.perform({ token });

        expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' });
        expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1);
    });
});
