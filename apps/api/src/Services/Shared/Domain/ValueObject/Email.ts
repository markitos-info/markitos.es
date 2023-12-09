import BadRequestException from '../Exception/BadRequestException';

class Email {
    constructor(public readonly value: string) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        /* eslint-disable no-useless-escape */
        const regexp = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        const isValid = regexp.test(this.value);
        if (isValid) return;

        throw new BadRequestException(`invalid email ${this.value}`);
    }
}

export default Email;
