import { Router } from 'express'

export default (router: Router): void => {
    router.post('/login/facebook', (req, res, next) => {
        res.send({ data: 'any_data' })
    })
}
