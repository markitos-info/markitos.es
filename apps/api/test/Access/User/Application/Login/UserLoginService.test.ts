import UserLoginRequest from '../../../../../src/Services/Access/User/Application/Login/UserLoginRequest';
import UserLoginResponse from '../../../../../src/Services/Access/User/Application/Login/UserLoginResponse';
import UserLoginService from '../../../../../src/Services/Access/User/Application/Login/UserLoginService';
import BadRequestException from '../../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import PasswordHasherForTest from '../../../../Shared/Infraestructure/PasswordHasherForTest';
import TokenatorForTest from '../../../../Shared/Infraestructure/TokenatorForTest';
import UserMother from '../../UserMother';
import UserRepositoryForTest from '../UserRepositoryForTest';

const users: UserRepositoryForTest = new UserRepositoryForTest();
const hasher: PasswordHasherForTest = new PasswordHasherForTest();
const tokener: TokenatorForTest = new TokenatorForTest();

describe('User Login Service', () => {
    it('should login user', async() => {
        const request: UserLoginRequest = UserMother.UserLoginRequest();
        const sut: UserLoginService = new UserLoginService(
            users,
            hasher,
            tokener
        );

        await sut.execute(request);

        expect(hasher.equalsCalled).toBeTruthy();
        expect(tokener.createCalled).toBeTruthy();
    });

    it('shoud result a response with token jwt encode', async() => {
        const request: UserLoginRequest = UserMother.UserLoginRequest();

        const sut: UserLoginService = new UserLoginService(
            users,
            hasher,
            tokener
        );
        const result: UserLoginResponse = await sut.execute(request);
        const token: string = result.token;

        expect(token).not.toBeNull();
    });

    it('should throw a bad request on invalid email', async() => {
        const request: UserLoginRequest =
            UserMother.UserLoginRequest('non-valid-email');

        const sut: UserLoginService = new UserLoginService(
            users,
            hasher,
            tokener
        );

        try {
            await sut.execute(request);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });
});
