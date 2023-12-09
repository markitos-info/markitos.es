import UserListRequest from '../../../../../src/Services/Access/User/Application/List/UserListRequest';
import UserListResponse from '../../../../../src/Services/Access/User/Application/List/UserListResponse';
import UserListService from '../../../../../src/Services/Access/User/Application/List/UserListService';
import UserMother from '../../UserMother';
import UserRepositoryForTest from '../UserRepositoryForTest';

const respository: UserRepositoryForTest = new UserRepositoryForTest();
const request: UserListRequest = UserMother.UserListRequest();
const sut: UserListService = UserMother.UserListService(respository);

describe('UserListService', () => {
    it('shoud get a list response with a users collection', async() => {
        const result: UserListResponse = await sut.execute(request);

        expect(respository.listCalled).toBeTruthy();
        expect(result.list.length).toBe(1);
        expect(result.list[0].id).toStrictEqual(UserMother.User().id);
    });
});
