import { ValidationBuilder, Validator } from '@/application/validation'
import { ok, unauthorizared } from '@/application/helpers/http'
import { FacebookAuthentication } from '@/domain/features'
import { HttpResponse } from '@/application/helpers'
import { AccessToken } from '@/domain/models'
import { Controller } from '@/application/controllers'

type HttpRequest = {
    token: string
}

type Model =
    | Error
    | {
          accessToken: string
      }

export class FacebookLoginController extends Controller {
    constructor(
        private readonly facebookAuthentication: FacebookAuthentication
    ) {
        super()
    }

    async perform({ token }: HttpRequest): Promise<HttpResponse<Model>> {
        const accessToken = await this.facebookAuthentication.perform({
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
