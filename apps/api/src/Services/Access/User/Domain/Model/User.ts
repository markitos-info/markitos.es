import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import DateTools from '../../../../Shared/Domain/Lib/DateTools';
import Email from '../../../../Shared/Domain/ValueObject/Email';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Name from '../../../../Shared/Domain/ValueObject/Name';
import Password from '../../../../Shared/Domain/ValueObject/Password';
import UserPublicType from './UserPublicType';

class User implements ToPrimitiveTypeResult {
    private constructor(
        public readonly id: Id,
        public readonly email: Email,
        public readonly name: Name,
        public readonly password: Password,
        public readonly createdAt: Date
    ) {}

    public static create(
        id: Id,
        email: Email,
        name: Name,
        password: Password,
        createdAt?: Date
    ): User {
        let created: Date = new Date();
        if (createdAt !== undefined) {
            created = createdAt;
        }

        return new User(id, email, name, password, created);
    }

    public toPrimitives(): UserPublicType {
        return {
            id: this.id.value,
            name: this.name.value,
            createdAt: DateTools.dateToString(this.createdAt),
        };
    }
}

export default User;
