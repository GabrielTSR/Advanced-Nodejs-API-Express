import { ValidationComposite, Validator } from '@/application/validation'
import { badRequest, serverError } from '@/application/helpers/http'
import { HttpResponse } from '@/application/helpers'

export abstract class Controller {
    abstract perform(httpRequest: any): Promise<HttpResponse>

    buildValidators(httpRequest: any): Validator[] {
        return []
    }

    async handle(httpRequest: any): Promise<HttpResponse> {
        const error = this.validate(httpRequest)
        if (error) {
            return badRequest(error)
        }
        try {
            return await this.perform(httpRequest)
        } catch (e) {
            const error = e instanceof Error ? e : new Error('infra_error')
            return serverError(error)
        }
    }

    private validate(httpRequest: any): Error | undefined {
        const validators = this.buildValidators(httpRequest)
        return new ValidationComposite(validators).validate()
    }
}
