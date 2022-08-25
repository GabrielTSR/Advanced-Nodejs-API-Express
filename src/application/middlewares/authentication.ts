import { Middleware } from '@/application/middlewares'
import { RequiredStringValidator } from '@/application/validation'
import { forbidden, ok } from '@/application/helpers/http'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { authorization: string }
type Model = Error | { userId: string }
type Authorize = (input: { token: string }) => Promise<string>
export class AuthenticationMiddleware implements Middleware {
    constructor(private readonly authorize: Authorize) {}

    async handle({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
        if (this.validate({ authorization })) return forbidden()
        try {
            const userId = await this.authorize({ token: authorization })
            return ok({ userId })
        } catch {
            return forbidden()
        }
    }

    private validate({ authorization }: HttpRequest): Error | undefined {
        const error = new RequiredStringValidator(
            authorization,
            'authorization'
        ).validate()
        return error
    }
}
