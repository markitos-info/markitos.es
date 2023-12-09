import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import User from '../../Domain/Model/User';
import UserPublicType from '../../Domain/Model/UserPublicType';

class UserGetResponse implements ToPrimitiveTypeResult {
    constructor(public readonly user: User) {}

    toPrimitives(): UserPublicType {
        return this.user.toPrimitives();
    }
}

export default UserGetResponse;
