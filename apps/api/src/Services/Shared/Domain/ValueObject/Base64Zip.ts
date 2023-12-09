import BadRequestException from '../Exception/BadRequestException';

class Base64Zip {
    private signatures: string[] = ['UEs'];

    constructor(public readonly value: string) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        let valid: boolean = false;

        for (const index in this.signatures) {
            if (this.value.startsWith(this.signatures[index])) {
                valid = true;
                break;
            }
        }
        if (valid) {
            return;
        }

        this.throwException();
    }

    protected throwException(): void {
        throw new BadRequestException(`invalid base64 as zip`);
    }
}

export default Base64Zip;
