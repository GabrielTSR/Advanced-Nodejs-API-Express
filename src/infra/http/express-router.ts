import { Controller } from '@/application/controllers'
import { RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
    return async (req, res) => {
        const httpResponse = await controller.handle({ ...req.body })
        if (httpResponse.statusCode < 300) {
            res.status(200).json(httpResponse)
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.data.message,
            })
        }
    }
}
