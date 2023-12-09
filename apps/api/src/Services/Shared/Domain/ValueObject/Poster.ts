import BadRequestException from '../Exception/BadRequestException';
import LimitedString from './LimitedString';

class Poster extends LimitedString {
    protected throwException(): void {
        throw new BadRequestException('invalid Poster ');
    }
}

export default Poster;
