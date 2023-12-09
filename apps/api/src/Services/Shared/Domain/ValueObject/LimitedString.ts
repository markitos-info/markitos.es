import BadRequestException from '../Exception/BadRequestException';

class LimitedString {
    public static MINIMUM_LENGTH: number = 1;
    public static MAXIMUM_LENGTH: number = 255;

    constructor(
        public readonly value: string,
        public readonly minimum: number = LimitedString.MINIMUM_LENGTH,
        public readonly maximum: number = LimitedString.MAXIMUM_LENGTH
    ) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        if (
            this.value.length >= this.minimum &&
            this.value.length <= this.maximum
        ) {
            return;
        }

        this.throwException();
    }

    protected throwException(): void {
        throw new BadRequestException(
            `value must be between ${LimitedString.MINIMUM_LENGTH} and ${LimitedString.MAXIMUM_LENGTH} chars length, your value its not valid: ${this.value}`
        );
    }
}

export default LimitedString;
