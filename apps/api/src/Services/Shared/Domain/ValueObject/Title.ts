import BadRequestException from '../Exception/BadRequestException';
import Base64Text from './Base64Text';

class Title extends Base64Text {
    protected throwException(): void {
        throw new BadRequestException('invalid title');
    }
}

export default Title;
