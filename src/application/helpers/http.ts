import { ServerError, UnauthorizaredError } from '@/application/errors'

export type HttpResponse = {
    statusCode: number
    data: any
}

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    data: error,
})

export const unauthorizared = (): HttpResponse => ({
    statusCode: 401,
    data: new UnauthorizaredError(),
})

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    data: new ServerError(error),
})
