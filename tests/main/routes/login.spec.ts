import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { getConnection } from 'typeorm'

import { PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { FacebookApi } from '@/infra/apis'

describe('Login Routes', () => {
    describe('POST /login/facebook', () => {
        let backup: IBackup
        let db: IMemoryDb

        beforeAll(async () => {
            db = await makeFakeDb([PgUser])
            backup = db.backup()
        })

        afterAll(async () => {
            await getConnection().close()
        })

        beforeEach(() => {
            backup.restore()
        })

        it('should return 200 with AcessToken', async () => {
            const FacebookApiStub = jest.spyOn(
                FacebookApi.prototype,
                'loadUser'
            )
            FacebookApiStub.mockReturnValueOnce(
                new Promise((resolve, reject) => {
                    resolve({
                        facebookId: 'any_fb_id',
                        name: 'any_name',
                        email: 'any_email',
                    })
                })
            )

            await request(app)
                .post('/api/login/facebook')
                .send({ token: 'valid_token' })
                .expect(200)
        })
    })
})
