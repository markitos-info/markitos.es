import BadRequestException from '../Exception/BadRequestException';

class CommaTags {
    public static MINIMUM_TAG_LENGTH: number = 2;
    public static MAXIMUM_TAG_LENGTH: number = 20;

    constructor(
        public readonly value: string,
        public readonly minimum: number = CommaTags.MINIMUM_TAG_LENGTH,
        public readonly maximum: number = CommaTags.MAXIMUM_TAG_LENGTH
    ) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        const tags: string[] = this.value.split(',');
        if (tags.length === 0) {
            this.throwException();
        }
        tags.forEach((faq) => {
            if (faq.length >= this.minimum && faq.length <= this.maximum) {
                return;
            }

            this.throwException();
        });
    }

    toArray(): string[] {
        return this.value.split(',');
    }

    protected throwException(): void {
        throw new BadRequestException(
            `each tag must be between ${CommaTags.MINIMUM_TAG_LENGTH} and ${CommaTags.MAXIMUM_TAG_LENGTH} chars length, your value its not valid: ${this.value}`
        );
    }
}

export default CommaTags;
