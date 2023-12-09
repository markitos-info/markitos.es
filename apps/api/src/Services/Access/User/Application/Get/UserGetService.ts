import Id from '../../../../Shared/Domain/ValueObject/Id';
import User from '../../Domain/Model/User';
import UserRepository from '../../Domain/Persistence/UserRepository';
import UserGetRequest from './UserGetRequest';
import GetResponse from './UserGetResponse';

class UserGetService {
    constructor(private readonly users: UserRepository) {}

    async execute(request: UserGetRequest): Promise<GetResponse> {
        const user: User = await this.users.get(new Id(request.id));

        return new GetResponse(user);
    }
}

export default UserGetService;
