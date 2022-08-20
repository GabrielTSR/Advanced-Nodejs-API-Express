import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

describe('PgUserAccountRepository', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup

    describe('load', () => {
        beforeAll(async () => {
            const db = await makeFakeDb([PgUser])
            backup = db.backup()
            pgUserRepo = getRepository(PgUser)
        })

        afterAll(async () => {
            await getConnection().close()
        })

        beforeEach(() => {
            backup.restore()

            sut = new PgUserAccountRepository()
        })

        it('should return an account if email exists', async () => {
            await pgUserRepo.save({ email: 'existing_email' })

            const account = await sut.load({ email: 'existing_email' })

            expect(account).toEqual({ id: '1' })
        })

        it('should return undefined if email does not exists', async () => {
            const account = await sut.load({ email: 'new_email' })

            expect(account).toBeUndefined()
        })
    })
})
