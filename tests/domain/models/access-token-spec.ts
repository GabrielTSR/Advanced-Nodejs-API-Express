import { AccessToken } from '@/domain/models/access-token';
describe('AccessToken', () => {
    it('should create with a value', () => {
        const sut = new AccessToken('any_value');

        expect(sut).toEqual({ value: 'any_value' });
    });

    it('should expire in 30 minutes (1800000 ms)', () => {
        expect(AccessToken.expirationInMs).toBe(1800000);
    });
});
