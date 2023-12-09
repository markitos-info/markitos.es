import BadRequestException from '../../../../Shared/Domain/Exception/BadRequestException';
import PasswordHasher from '../../../../Shared/Domain/Lib/PasswordHasher';
import Tokenator from '../../../../Shared/Domain/Lib/Tokenator';
import Email from '../../../../Shared/Domain/ValueObject/Email';
import User from '../../Domain/Model/User';
import UserRepository from '../../Domain/Persistence/UserRepository';
import UserLoginRequest from './UserLoginRequest';
import LoginResponse from './UserLoginResponse';

class UserLoginService {
    constructor(
        private readonly users: UserRepository,
        private readonly hasher: PasswordHasher,
        private readonly tokener: Tokenator
    ) {}

    async execute(request: UserLoginRequest): Promise<LoginResponse> {
        const hashedPassword: string = await this.hasher.hash(request.password);
        const user: User = await this.users.getByEmail(
            new Email(request.email)
        );

        if (user.email === undefined) {
            throw new BadRequestException('invalid credentials');
        }

        const validPassword: boolean = await this.hasher.equals(
            request.password,
            hashedPassword
        );
        if (validPassword === false) {
            throw new BadRequestException('invalid credentials');
        }
        const jwt = await this.tokener.create(user.toPrimitives());

        return new LoginResponse(jwt);
    }
}

export default UserLoginService;
