import { getRepository } from 'typeorm'
import {
    LoadUserAccountRepository,
    SaveFacebookAccountRepository,
} from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgres/entities/user'

type LoadInput = LoadUserAccountRepository.Input
type LoadOutput = LoadUserAccountRepository.Output
type SaveInput = SaveFacebookAccountRepository.Input
type SaveOutput = SaveFacebookAccountRepository.Output
export class PgUserAccountRepository
    implements LoadUserAccountRepository, SaveFacebookAccountRepository {
    async load({ email }: LoadInput): Promise<LoadOutput> {
        const pgUserRepo = getRepository(PgUser)
        const pgUser = await pgUserRepo.findOne({ email })
        if (pgUser) {
            return {
                id: pgUser.id?.toString(),
                name: pgUser?.name ?? undefined,
            }
        }
        return undefined
    }

    async saveWithFacebook({
        id,
        name,
        email,
        facebookId,
    }: SaveInput): Promise<SaveOutput> {
        const pgUserRepo = getRepository(PgUser)
        let outputId: string
        if (!id) {
            const pgUser = await pgUserRepo.save({
                email,
                name,
                facebookId,
            })
            outputId = pgUser.id?.toString()
        } else {
            outputId = id
            await pgUserRepo.save({
                id: Number(outputId),
                name,
                facebookId,
            })
        }
        return { id: outputId }
    }
}
