import { RequiredFieldError } from '@/application/errors/http'
import { badRequest, unauthorizared } from '@/application/helpers/http'
import { FacebookAuthentication } from '@/domain/features'
import { HttpResponse } from '@/application/helpers'
import { ServerError } from '@/application/errors'
import { AuthenticationError } from '@/domain/errors'

export class FacebookLoginController {
    constructor(private readonly facebookAuthentication: FacebookAuthentication) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        try {
            if (httpRequest?.token === '' || !httpRequest?.token) {
                return badRequest(new RequiredFieldError('token'))
            }
            const result = await this.facebookAuthentication.perform({ token: httpRequest.token })
            if (result instanceof AuthenticationError) {
                return unauthorizared()
            } else {
                return {
                    statusCode: 200,
                    data: { accessToken: result.value },
                }
            }
        } catch (e) {
            const error = e instanceof Error ? e : new Error('infra_error')
            return {
                statusCode: 500,
                data: new ServerError(error),
            }
        }
    }
}
