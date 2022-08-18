import { LoadFacebookUserApi } from './../../../src/data/contracts/apis/facebook';
import { AuthenticationError } from '@/domain/errors';
import { FacebookAuthenticationService } from '@/data/services';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FacebookAuthenticationService', () => {
    let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
    let sut: FacebookAuthenticationService;
    beforeEach(() => {
        loadFacebookUserApi = mock<LoadFacebookUserApi>();
        sut = new FacebookAuthenticationService(loadFacebookUserApi);
    });

    it('should call loadFacebookUserApi with correct params', async () => {
        await sut.perform({ token: 'any_token' });

        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' });
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
    });

    it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);

        const authResult = await sut.perform({ token: 'any_token' });

        expect(authResult).toEqual(new AuthenticationError());
    });
});
