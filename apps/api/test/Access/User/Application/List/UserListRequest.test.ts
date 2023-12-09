import UserListRequest from '../../../../../src/Services/Access/User/Application/List/UserListRequest';
import UserMother from '../../UserMother';

describe('UserListRequest', () => {
    it('shoud create with an optionally pattern string', () => {
        const sut: UserListRequest = UserMother.UserListRequest();

        expect(sut.pattern).toStrictEqual(UserMother.LIST_PATTERN);
    });
});
