import { ValidationBuilder, Validator } from '@/application/validation'
import { ok, unauthorizared } from '@/application/helpers/http'
import { HttpResponse } from '@/application/helpers'
import { AccessToken } from '@/domain/entities'
import { Controller } from '@/application/controllers'
import { FacebookAuthentication } from '@/domain/use-cases'

type HttpRequest = {
    token: string
}

type Model = Error | { accessToken: string }

export class FacebookLoginController extends Controller {
    constructor(
        private readonly facebookAuthentication: FacebookAuthentication
    ) {
        super()
    }

    async perform({ token }: HttpRequest): Promise<HttpResponse<Model>> {
        const accessToken = await this.facebookAuthentication({
            token,
        })
        return accessToken instanceof AccessToken
            ? ok({
                  accessToken: accessToken.value,
              })
            : unauthorizared()
    }

    override buildValidators({ token }: HttpRequest): Validator[] {
        return [
            ...ValidationBuilder.of({
                value: token,
                fieldName: 'token',
            })
                .required()
                .build(),
        ]
    }
}
