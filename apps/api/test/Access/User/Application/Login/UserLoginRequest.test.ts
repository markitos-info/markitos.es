import UserLoginRequest from '../../../../../src/Services/Access/User/Application/Login/UserLoginRequest';
import { SharedMother } from '../../../../Shared/SharedMother';
import UserMother from '../../UserMother';
describe('User Login Request', () => {
    it('should create with primitive required user state', () => {
        const sut: UserLoginRequest = UserMother.UserLoginRequest();

        expect(sut.email).toStrictEqual(SharedMother.VALID_EMAIL);
        expect(sut.password).toStrictEqual(SharedMother.VALID_PASSWORD);
    });
});
