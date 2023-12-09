import BadRequestException from '../Exception/BadRequestException';

class Id {
    constructor(public readonly value: string) {
        this.validateOrThrowException();
    }

    public static valid(uuid: string): boolean {
        const ereg: RegExp = new RegExp(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i'
        );

        return ereg.test(uuid);
    }

    private validateOrThrowException(): void {
        if (this.value.length == 36) {
            return;
        }

        this.throwException();
    }

    protected throwException(): void {
        throw new BadRequestException('invalid id ' + this.value);
    }
}

export default Id;
