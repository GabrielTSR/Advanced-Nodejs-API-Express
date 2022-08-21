import { ValidationComposite } from './../validation/composite'
import {
    badRequest,
    ok,
    serverError,
    unauthorizared,
} from '@/application/helpers/http'
import { FacebookAuthentication } from '@/domain/features'
import { HttpResponse } from '@/application/helpers'
import { AccessToken } from '@/domain/models'
import { RequiredStringValidator } from '@/application/validation'

type HttpRequest = {
    token: string
}

type Model =
    | Error
    | {
          accessToken: string
      }

export class FacebookLoginController {
    constructor(
        private readonly facebookAuthentication: FacebookAuthentication
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const error = this.validate(httpRequest)
            if (error) {
                return badRequest(error)
            }
            const accessToken = await this.facebookAuthentication.perform({
                token: httpRequest.token,
            })
            if (accessToken instanceof AccessToken) {
                return ok({
                    accessToken: accessToken.value,
                })
            } else {
                return unauthorizared()
            }
        } catch (e) {
            const error = e instanceof Error ? e : new Error('infra_error')
            return serverError(error)
        }
    }

    private validate(httpRequest: HttpRequest): Error | undefined {
        const validators = [
            new RequiredStringValidator(httpRequest.token, 'token'),
        ]
        return new ValidationComposite(validators).validate()
    }
}
