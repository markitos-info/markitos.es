import BadRequestException from '../Exception/BadRequestException';

class Tags {
    public static MINIMUM_TAG_LENGTH: number = 3;
    public static MAXIMUM_TAG_LENGTH: number = 20;

    constructor(
        public readonly value: string[],
        public readonly minimum: number = Tags.MINIMUM_TAG_LENGTH,
        public readonly maximum: number = Tags.MAXIMUM_TAG_LENGTH
    ) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        if (this.value.length === 0) {
            this.throwException();
        }

        this.value.forEach((faq) => {
            if (faq.length >= this.minimum && faq.length <= this.maximum) {
                return;
            }

            this.throwException();
        });
    }

    protected throwException(): void {
        throw new BadRequestException(
            `each tag must be between ${Tags.MINIMUM_TAG_LENGTH} and ${Tags.MAXIMUM_TAG_LENGTH} chars length, your value its not valid: ${this.value}`
        );
    }
}

export default Tags;
