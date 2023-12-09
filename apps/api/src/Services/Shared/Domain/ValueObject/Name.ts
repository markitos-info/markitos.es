import BadRequestException from '../Exception/BadRequestException';

class Name {
    public static MINIMUM_TAG_LENGTH: number = 3;
    public static MAXIMUM_TAG_LENGTH: number = 25;

    constructor(
        public readonly value: string,
        public readonly minimum: number = Name.MINIMUM_TAG_LENGTH,
        public readonly maximum: number = Name.MAXIMUM_TAG_LENGTH
    ) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        const validLength: boolean =
            this.value.length >= Name.MINIMUM_TAG_LENGTH &&
            this.value.length <= Name.MAXIMUM_TAG_LENGTH;
        const regexp = new RegExp(/^[a-zA-Z]{1,}[a-zA-Z\s]*[a-zA-Z]{1,}$/);
        const isValid: boolean = validLength && regexp.test(this.value);
        if (isValid) return;

        throw new BadRequestException(`invalid name ${this.value}`);
    }

    protected throwException(): void {
        throw new BadRequestException(
            `name must contain only letters, start with letter:min3, spaces and end with letters:min3 must be between ${Name.MINIMUM_TAG_LENGTH} and ${Name.MAXIMUM_TAG_LENGTH} chars length, your value its not valid: ${this.value}`
        );
    }
}

export default Name;
