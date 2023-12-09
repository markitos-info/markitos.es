import UserRegisterResponse from '../../../../../src/Services/Access/User/Application/Register/UserRegisterResponse';
import { SharedMother } from '../../../../Shared/SharedMother';
import UserMother from '../../UserMother';
describe('User Register Response', () => {
    it('should create with primitive string id', () => {
        const sut: UserRegisterResponse = UserMother.UserRegisterResponse();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
    });
});
