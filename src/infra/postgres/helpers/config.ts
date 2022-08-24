import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'kesavan.db.elephantsql.com',
    port: 5432,
    username: 'xvojqxgy',
    password: 'PWc3mZnZBJ6UIFP5PTf7clfkGMu5NNTU',
    database: 'xvojqxgy',
    entities: ['dist/infra/postgres/entities/index.js'],
}
