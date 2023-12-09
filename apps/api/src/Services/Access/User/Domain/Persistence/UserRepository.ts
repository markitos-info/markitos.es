import Email from '../../../../Shared/Domain/ValueObject/Email';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import User from '../Model/User';

interface UserRepository {
    register(user: User): Promise<void>;
    delete(id: Id): Promise<void>;
    get(id: Id): Promise<User>;
    getByEmail(email: Email): Promise<User>;
    list(pattern?: string): Promise<User[]>;
}

export default UserRepository;
