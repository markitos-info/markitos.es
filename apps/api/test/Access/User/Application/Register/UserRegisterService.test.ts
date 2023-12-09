import UserRegisterRequest from '../../../../../src/Services/Access/User/Application/Register/UserRegisterRequest';
import UserRegisterResponse from '../../../../../src/Services/Access/User/Application/Register/UserRegisterResponse';
import UserRegisterService from '../../../../../src/Services/Access/User/Application/Register/UserRegisterService';
import BadRequestException from '../../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import PasswordHasher from '../../../../../src/Services/Shared/Domain/Lib/PasswordHasher';
import PasswordHasherForTest from '../../../../Shared/Infraestructure/PasswordHasherForTest';
import { SharedMother } from '../../../../Shared/SharedMother';
import UserMother from '../../UserMother';
import UserRepositoryForTest from '../UserRepositoryForTest';

const users: UserRepositoryForTest = new UserRepositoryForTest();
const hasher: PasswordHasherForTest = new PasswordHasherForTest();

describe('User Register Service', () => {
    it('should create user', async () => {
        const request: UserRegisterRequest = UserMother.UserRegisterRequest();

        const sut: UserRegisterService = new UserRegisterService(
            users,
            hasher as PasswordHasher
        );
        await sut.execute(request);

        expect(users.registerCalled).toBeTruthy();
        expect(hasher.hashCalled).toBeTruthy();

        hasher.reset();
    });

    it('shoud result a response with create id', async () => {
        const request: UserRegisterRequest = UserMother.UserRegisterRequest();

        const sut: UserRegisterService = new UserRegisterService(users, hasher);
        const result: UserRegisterResponse = await sut.execute(request);

        expect(result.id).toStrictEqual(SharedMother.VALID_ID);
    });

    it('should throw a bad request on invalid id', async () => {
        const request: UserRegisterRequest =
            UserMother.UserRegisterRequest('non-valid-id');

        const sut: UserRegisterService = new UserRegisterService(users, hasher);

        try {
            await sut.execute(request);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });
});
