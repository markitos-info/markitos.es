import BadRequestException from '../Exception/BadRequestException';
import LimitedString from './LimitedString';

class Password extends LimitedString {
    public static MINIMUM_PASSWORD_LENGTH: number = 8;
    public static MAXIMUM_PASSWORD_LENGTH: number = 100;

    constructor(value: string) {
        super(
            value,
            Password.MINIMUM_PASSWORD_LENGTH,
            Password.MAXIMUM_PASSWORD_LENGTH
        );
    }

    protected throwException(): void {
        throw new BadRequestException(
            `invalid password must have ${Password.MINIMUM_PASSWORD_LENGTH} - ${Password.MAXIMUM_PASSWORD_LENGTH} chars length`
        );
    }
}
export default Password;
