import UserLoginResponse from '../../../../../src/Services/Access/User/Application/Login/UserLoginResponse';
import { SharedMother } from '../../../../Shared/SharedMother';
import UserMother from '../../UserMother';
describe('User Login Response', () => {
    it('should create with primitive string value', () => {
        const sut: UserLoginResponse = UserMother.UserLoginResponse();

        expect(sut.token).toStrictEqual(SharedMother.VALID_ID);
    });
});
