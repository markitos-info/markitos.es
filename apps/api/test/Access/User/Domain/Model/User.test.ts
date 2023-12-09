import User from '../../../../../src/Services/Access/User/Domain/Model/User';
import Email from '../../../../../src/Services/Shared/Domain/ValueObject/Email';
import Id from '../../../../../src/Services/Shared/Domain/ValueObject/Id';
import Name from '../../../../../src/Services/Shared/Domain/ValueObject/Name';
import Password from '../../../../../src/Services/Shared/Domain/ValueObject/Password';
import { SharedMother } from '../../../../Shared/SharedMother';
import UserMother from '../../UserMother';

describe('User', () => {
    it('should have an email, id and pass', () => {
        const sut: User = UserMother.User();

        expect(sut.id).toBeInstanceOf(Id);
        expect(sut.id.value).toStrictEqual(SharedMother.VALID_ID);
        expect(sut.email).toBeInstanceOf(Email);
        expect(sut.email.value).toStrictEqual(SharedMother.VALID_EMAIL);
        expect(sut.name).toBeInstanceOf(Name);
        expect(sut.name.value).toStrictEqual(SharedMother.VALID_NAME);
        expect(sut.password).toBeInstanceOf(Password);
        expect(sut.password.value).toStrictEqual(SharedMother.VALID_PASSWORD);
    });
});
