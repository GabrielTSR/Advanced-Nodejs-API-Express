import { getRepository } from 'typeorm'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities/user'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFacebookAccountRepository.Params
export class PgUserAccountRepository implements LoadUserAccountRepository {
    private readonly pgUserRepo = getRepository(PgUser)

    async load(params: LoadParams): Promise<LoadResult> {
        const pgUser = await this.pgUserRepo.findOne({ email: params.email })
        if (pgUser) {
            return {
                id: pgUser.id?.toString(),
                name: pgUser?.name ?? undefined,
            }
        }
        return undefined
    }

    async saveWithFacebook(params: SaveParams): Promise<void> {
        if (!params?.id) {
            await this.pgUserRepo.save({
                email: params.email,
                name: params.name,
                facebookId: params.facebookId,
            })
        } else {
            await this.pgUserRepo.save({
                id: Number(params.id),
                name: params.name,
                facebookId: params.facebookId,
            })
        }
    }
}
