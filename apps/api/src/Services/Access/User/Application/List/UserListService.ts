import User from '../../Domain/Model/User';
import UserRepository from '../../Domain/Persistence/UserRepository';
import UserListRequest from './UserListRequest';
import UserListResponse from './UserListResponse';

class UserListService {
    constructor(private readonly repository: UserRepository) {}
    async execute(request: UserListRequest): Promise<UserListResponse> {
        const collection: User[] = await this.repository.list(request.pattern);

        return new UserListResponse(collection);
    }
}

export default UserListService;
