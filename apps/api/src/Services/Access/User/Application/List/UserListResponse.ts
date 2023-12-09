import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import User from '../../Domain/Model/User';
import UserPublicType from '../../Domain/Model/UserPublicType';

class UserListResponse implements ToPrimitiveTypeResult {
    constructor(public readonly list: User[]) {}

    toPrimitives(): UserPublicType[] {
        const result: UserPublicType[] = [];

        this.list.forEach((item: User) => {
            result.push(item.toPrimitives());
        });

        return result;
    }
}

export default UserListResponse;
