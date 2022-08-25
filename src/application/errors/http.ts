export class ServerError extends Error {
    constructor(error?: Error) {
        super('Server failed. Try again later.')
        this.name = 'ServerError'
        this.stack = error?.stack
    }
}

export class RequiredFieldError extends Error {
    constructor(fieldName: string) {
        super(`The field ${fieldName} is required`)
        this.name = 'RequiredFieldError'
    }
}
export class UnauthorizaredError extends Error {
    constructor() {
        super('Unauthorized')
        this.name = 'UnauthorizedError'
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Access denied')
        this.name = 'ForbiddenError'
    }
}
