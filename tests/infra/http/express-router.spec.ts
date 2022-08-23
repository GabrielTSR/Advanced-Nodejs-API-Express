import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { Controller } from '@/application/controllers'
import { mock } from 'jest-mock-extended'

class ExpressRouter {
    constructor(private readonly controller: Controller) {}

    async adapt(req: Request, res: Response): Promise<void> {
        await this.controller.handle({ ...req.body })
    }
}

describe('ExpressRouter', () => {
    beforeEach(() => {})
    it('should call handle with correct request', async () => {
        await sut.adapt(req, res)

        expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    })

    it('should call handle with empty request', async () => {
        const req = getMockReq({ body: undefined })
        const { res } = getMockRes()
        const controller = mock<Controller>()
        const sut = new ExpressRouter(controller)

        await sut.adapt(req, res)

        expect(controller.handle).toHaveBeenCalledWith({})
    })
})
