import UserRegisterRequest from '../../../../../src/Services/Access/User/Application/Register/UserRegisterRequest';
import { SharedMother } from '../../../../Shared/SharedMother';
import UserMother from '../../UserMother';
describe('User Register Request', () => {
    it('should create with primitive required user state', () => {
        const sut: UserRegisterRequest = UserMother.UserRegisterRequest();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
        expect(sut.email).toStrictEqual(SharedMother.VALID_EMAIL);
        expect(sut.name).toStrictEqual(SharedMother.VALID_NAME);
        expect(sut.password).toStrictEqual(SharedMother.VALID_PASSWORD);
    });
});
