import { atob } from 'buffer';
import BadRequestException from '../Exception/BadRequestException';

class Base64Text {
    constructor(public readonly value: string) {
        this.validateOrThrowException();
    }

    private validateOrThrowException(): void {
        const hasValue = this.value != undefined || this.value != '';
        if (hasValue === false) this.throwException();

        try {
            decodeURIComponent(
                Array.prototype.map
                    .call(atob(this.value), function(c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join('')
            );
        } catch (error) {
            this.throwException();
        }
    }

    protected throwException(): void {
        throw new BadRequestException(`invalid base64 text`);
    }
}

export default Base64Text;
