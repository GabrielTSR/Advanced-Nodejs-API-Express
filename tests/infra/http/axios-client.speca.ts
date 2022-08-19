import axios from 'axios';

import { HttpGetClient } from '@/infra/http';

jest.mock('axios');

class AxiosHttpClient {
    async get(params: HttpGetClient.Params): Promise<void> {}
}

describe('AxiosHttpClient', () => {
    describe('get', () => {
        it('should call get with correct params', async () => {
            const fakeAxios = axios as jest.Mocked<typeof axios>;
            const sut = new AxiosHttpClient();

            await sut.get({
                url: 'any_url',
                params: {
                    any: 'any',
                },
            });

            expect(fakeAxios.get).toHaveBeenCalledWith('any_url', {
                params: {
                    any: 'any',
                },
            });
        });
    });
});
