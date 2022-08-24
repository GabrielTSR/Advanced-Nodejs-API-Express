import { UnauthorizaredError } from '@/application/errors/http'
import { PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { getConnection } from 'typeorm'

describe('Login Routes', () => {
    describe('POST /login/facebook', () => {
        let backup: IBackup
        let db: IMemoryDb
        const loadUserSpy = jest.fn()

        jest.mock('@/infra/apis/facebook', () => ({
            FacebookApi: jest.fn().mockReturnValue({ loadUser: loadUserSpy }),
        }))

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
            loadUserSpy.mockReturnValueOnce({
                facebookId: 'any_fb_id',
                name: 'any_name',
                email: 'any_email',
            })

            const { status, body } = await request(app)
                .post('/api/login/facebook')
                .send({ token: 'valid_token' })

            expect(status).toBe(200)
            expect(body.data.accessToken).toBeDefined()
        })

        it('should return 401 with Unauthorized', async () => {
            const { status, body } = await request(app)
                .post('/api/login/facebook')
                .send({ token: 'invalid_token' })

            expect(status).toBe(401)
            expect(body.error).toBe(new UnauthorizaredError().message)
        })
    })
})
