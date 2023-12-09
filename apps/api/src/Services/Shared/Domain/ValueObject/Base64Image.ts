import BadRequestException from '../Exception/BadRequestException';

class Base64Image {
    private signatures: string[] = [
        'R0lGODdh',
        'R0lGODlh',
        'iVBORw0KGgo',
        '/9j/',
    ];

    constructor(public readonly value: string) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        let valid: boolean = false;

        for (const index in this.signatures) {
            if (this.value.startsWith(this.signatures[index])) {
                valid = true;
            }
        }
        if (valid) {
            return;
        }

        this.throwException();
    }

    protected throwException(): void {
        throw new BadRequestException(
            `invalid base64 as image, accepted, jpg png gif`
        );
    }
}

export default Base64Image;
