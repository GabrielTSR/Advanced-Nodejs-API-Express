import { ForbiddenError } from '@/application/errors'
import { app } from '@/main/config/app'
import { auth } from '@/main/middlewares'

import request from 'supertest'

describe('Authentication Middleware', () => {
    it('Should return 403 if authorization header was not provided', async () => {
        app.get('/fake_route', auth)

        const { status, body } = await request(app).get('/fake_route')

        expect(status).toBe(403)
        expect(body.error).toBe(new ForbiddenError().message)
    })

    it('Should return 200 if authorization header is valid', async () => {
        app.get('/fake_route', auth, (req, res) => {
            res.json(req.locals)
        })

        const { status, body } = await request(app).get('/fake_route')

        expect(status).toBe(403)
        expect(body.error).toBe(new ForbiddenError().message)
    })
})
