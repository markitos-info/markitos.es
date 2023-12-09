import UserListResponse from '../../../../../src/Services/Access/User/Application/List/UserListResponse';
import User from '../../../../../src/Services/Access/User/Domain/Model/User';
import { SharedMother } from '../../../../Shared/SharedMother';
import UserMother from '../../UserMother';

describe('UserListResponse', () => {
    it('shoud create with a list of users', () => {
        const sut: UserListResponse = UserMother.UserListResponse();

        expect(sut.list.length).toStrictEqual(1);
        expect(sut.list[0]).toBeInstanceOf(User);
        expect(sut.list[0].id.value).toStrictEqual(SharedMother.VALID_ID);
    });
});
