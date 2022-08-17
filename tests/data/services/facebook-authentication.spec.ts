import { AuthenticationError } from '@/domain/errors';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { FacebookAuthenticationService } from '@/data/services';

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
    token?: string;
    callsCount = 0;
    result = undefined;

    async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
        this.callsCount++;
        this.token = params.token;
        return this.result;
    }
}

describe('FacebookAuthenticationService', () => {
    it('should call loadFacebookUserApi with correct params', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy();
        const sut = new FacebookAuthenticationService(loadFacebookUserApi);

        await sut.perform({ token: 'any_token' });

        expect(loadFacebookUserApi.token).toBe('any_token');
        expect(loadFacebookUserApi.callsCount).toBe(1);
    });

    it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy();
        loadFacebookUserApi.result = undefined;
        const sut = new FacebookAuthenticationService(loadFacebookUserApi);

        const authResult = await sut.perform({ token: 'any_token' });

        expect(authResult).toEqual(new AuthenticationError());
    });
});
