import UserListRequest from '../../../src/Services/Access/User/Application/List/UserListRequest';
import UserListResponse from '../../../src/Services/Access/User/Application/List/UserListResponse';
import UserListService from '../../../src/Services/Access/User/Application/List/UserListService';
import UserLoginRequest from '../../../src/Services/Access/User/Application/Login/UserLoginRequest';
import UserLoginResponse from '../../../src/Services/Access/User/Application/Login/UserLoginResponse';
import UserRegisterRequest from '../../../src/Services/Access/User/Application/Register/UserRegisterRequest';
import UserRegisterResponse from '../../../src/Services/Access/User/Application/Register/UserRegisterResponse';
import UserRegisterService from '../../../src/Services/Access/User/Application/Register/UserRegisterService';
import User from '../../../src/Services/Access/User/Domain/Model/User';
import UserRepository from '../../../src/Services/Access/User/Domain/Persistence/UserRepository';
import PasswordHasher from '../../../src/Services/Shared/Domain/Lib/PasswordHasher';
import { SharedMother } from '../../Shared/SharedMother';

class UserMother {
    public static LIST_PATTERN: string = 'aaa';

    static UserRegisterService(
        users: UserRepository,
        hasher: PasswordHasher
    ): UserRegisterService {
        return new UserRegisterService(users, hasher);
    }

    static User(): User {
        return User.create(
            SharedMother.Id(),
            SharedMother.Email(),
            SharedMother.Name(),
            SharedMother.Password()
        );
    }

    static UserRegisterRequest(
        id?: string,
        name?: string,
        email?: string
    ): UserRegisterRequest {
        return new UserRegisterRequest(
            id !== undefined ? id : SharedMother.VALID_ID,
            email !== undefined ? email : SharedMother.VALID_EMAIL,
            name !== undefined ? name : SharedMother.VALID_NAME,
            SharedMother.VALID_PASSWORD
        );
    }
    static UserRegisterResponse(): UserRegisterResponse {
        return new UserRegisterResponse(SharedMother.VALID_ID);
    }

    static UserLoginRequest(
        email?: string,
        password?: string
    ): UserLoginRequest {
        return new UserLoginRequest(
            email !== undefined ? email : SharedMother.VALID_EMAIL,
            password !== undefined ? password : SharedMother.VALID_PASSWORD
        );
    }
    static UserLoginResponse(): UserLoginResponse {
        return new UserLoginResponse(SharedMother.VALID_ID);
    }

    public static UserListService(repository: UserRepository): UserListService {
        return new UserListService(repository);
    }

    public static UserListRequest(): UserListRequest {
        return new UserListRequest(UserMother.LIST_PATTERN);
    }

    public static UserListResponse(): UserListResponse {
        return new UserListResponse([UserMother.User()]);
    }
}

export default UserMother;
