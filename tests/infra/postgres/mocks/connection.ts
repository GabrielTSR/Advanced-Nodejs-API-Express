import { IMemoryDb, newDb } from 'pg-mem'

export async function makeFakeDb(entities?: any[]): Promise<IMemoryDb> {
    const db = newDb()
    const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: entities ?? ['src/infra/postgres/entities/index.ts'],
    })
    await connection.synchronize()

    return db
}
