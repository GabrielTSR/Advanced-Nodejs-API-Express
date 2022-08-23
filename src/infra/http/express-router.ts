import { Controller } from '@/application/controllers'
import { Request, Response } from 'express'

export class ExpressRouter {
    constructor(private readonly controller: Controller) {}

    async adapt(req: Request, res: Response): Promise<void> {
        const httpResponse = await this.controller.handle({ ...req.body })
        if (httpResponse.statusCode < 300) {
            res.status(200).json(httpResponse)
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.data.message,
            })
        }
    }
}
