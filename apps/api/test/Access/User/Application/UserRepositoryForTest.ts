import User from '../../../../src/Services/Access/User/Domain/Model/User';
import UserRepository from '../../../../src/Services/Access/User/Domain/Persistence/UserRepository';
import Email from '../../../../src/Services/Shared/Domain/ValueObject/Email';
import Id from '../../../../src/Services/Shared/Domain/ValueObject/Id';
import Password from '../../../../src/Services/Shared/Domain/ValueObject/Password';
import UserMother from '../UserMother';

class UserRepositoryForTest implements UserRepository {
    async delete(id: Id): Promise<void> {
        id === id;
    }

    async getByEmail(email: Email): Promise<User> {
        email === email;
        return UserMother.User();
    }

    async get(id: Id): Promise<User> {
        id === id;
        return UserMother.User();
    }

    public listCalled: boolean = false;
    async list(pattern?: string | undefined): Promise<User[]> {
        this.listCalled = pattern === pattern;
        return [UserMother.User()];
    }

    public registerCalled: boolean = false;
    async register(user: User): Promise<void> {
        this.registerCalled = user === user;
    }

    public loginCalled: boolean = false;
    async login(email: Email, password: Password): Promise<void> {
        email;
        password;
        this.loginCalled = true;
    }
}

export default UserRepositoryForTest;
