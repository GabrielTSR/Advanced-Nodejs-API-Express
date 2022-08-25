import { RequiredStringValidator, Validator } from '@/application/validation'

export class ValidationBuilder {
    constructor(
        private readonly value: string,
        private readonly fieldName: string,
        private readonly validators: Validator[] = []
    ) {}

    static of(input: { value: string; fieldName: string }): ValidationBuilder {
        return new ValidationBuilder(input.value, input.fieldName)
    }

    required(): ValidationBuilder {
        this.validators.push(
            new RequiredStringValidator(this.value, this.fieldName)
        )
        return this
    }

    build(): Validator[] {
        return this.validators
    }
}
