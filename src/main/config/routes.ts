import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express): void => {
    const router = Router()
    const routesFolderFiles = join(__dirname, '../routes')
    readdirSync(routesFolderFiles)
        .filter((file) => !file.endsWith('.map'))
        .map(async (file) => {
            ;(await import(`../routes/${file}`)).default(router)
        })
    app.use('/api', router)
}
