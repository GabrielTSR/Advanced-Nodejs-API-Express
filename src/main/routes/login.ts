import { adaptExpressRoute as adapt } from '@/main/adapters'
import { Router } from 'express'
import { makeFacebookLoginController } from '@/main/factories/controllers'

export default (router: Router): void => {
    const adapter = adapt(makeFacebookLoginController())
    router.post('/login/facebook', adapter)
}
