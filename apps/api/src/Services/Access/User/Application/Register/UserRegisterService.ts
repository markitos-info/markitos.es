import PasswordHasher from '../../../../Shared/Domain/Lib/PasswordHasher';
import Email from '../../../../Shared/Domain/ValueObject/Email';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Name from '../../../../Shared/Domain/ValueObject/Name';
import Password from '../../../../Shared/Domain/ValueObject/Password';
import User from '../../Domain/Model/User';
import UserRepository from '../../Domain/Persistence/UserRepository';
import UserRegisterRequest from './UserRegisterRequest';
import RegisterResponse from './UserRegisterResponse';

class UserRegisterService {
    constructor(
        private readonly users: UserRepository,
        private readonly hasher: PasswordHasher
    ) {}

    async execute(request: UserRegisterRequest): Promise<RegisterResponse> {
        new Password(request.password);

        const user: User = User.create(
            new Id(request.id),
            new Email(request.email),
            new Name(request.name),
            new Password(await this.hasher.hash(request.password))
        );

        await this.users.register(user);

        return new RegisterResponse(user.id.value);
    }
}

export default UserRegisterService;
