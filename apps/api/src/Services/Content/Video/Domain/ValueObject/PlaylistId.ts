import BadRequestException from '../../../../Shared/Domain/Exception/BadRequestException';
import LimitedString from '../../../../Shared/Domain/ValueObject/LimitedString';

class PlaylistId extends LimitedString {
    protected throwException(): void {
        throw new BadRequestException('invalid video PlaylistId');
    }
}

export default PlaylistId;
