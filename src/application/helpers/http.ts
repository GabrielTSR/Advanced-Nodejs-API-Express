import { ServerError, UnauthorizaredError } from '@/application/errors'

export type HttpResponse<T = any> = {
    statusCode: number
    data: T
}

export const ok = <T = any>(data: T): HttpResponse<T> => ({
    statusCode: 200,
    data,
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
    statusCode: 400,
    data: error,
})

export const unauthorizared = (): HttpResponse<Error> => ({
    statusCode: 401,
    data: new UnauthorizaredError(),
})

export const serverError = (error: Error): HttpResponse<Error> => ({
    statusCode: 500,
    data: new ServerError(error),
})
