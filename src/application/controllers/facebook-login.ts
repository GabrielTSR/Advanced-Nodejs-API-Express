import { RequiredFieldError } from '@/application/errors/http'
import { badRequest, ok, serverError, unauthorizared } from '@/application/helpers/http'
import { FacebookAuthentication } from '@/domain/features'
import { HttpResponse } from '@/application/helpers'
import { AccessToken } from '@/domain/models'

type HttpRequest = {
    token: string | null | undefined
}

type Model =
    | Error
    | {
          accessToken: string
      }

export class FacebookLoginController {
    constructor(private readonly facebookAuthentication: FacebookAuthentication) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            if (httpRequest?.token === '' || !httpRequest?.token) {
                return badRequest(new RequiredFieldError('token'))
            }
            const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
            if (accessToken instanceof AccessToken) {
                return ok({ accessToken: accessToken.value })
            } else {
                return unauthorizared()
            }
        } catch (e) {
            const error = e instanceof Error ? e : new Error('infra_error')
            return serverError(error)
        }
    }
}
