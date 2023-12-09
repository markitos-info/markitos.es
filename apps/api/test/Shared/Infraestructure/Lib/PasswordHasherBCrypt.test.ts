import { v4 as uuidv4 } from 'uuid';
import PasswordHasher from '../../../../src/Services/Shared/Domain/Lib/PasswordHasher';
import PasswordHasherBcrypt from '../../../../src/Services/Shared/Infraestructure/PasswordHasherBcrypt';
import { SharedMother } from '../../SharedMother';

const sut: PasswordHasher = new PasswordHasherBcrypt();

describe('PasswordHasherBCrypt', () => {
    it('shoud hash a plain text', async () => {
        const plain: string = SharedMother.HELLO_WORLD_LITERAL;

        const hashed: string = await sut.hash(plain);

        expect(hashed.length > plain.length).toBeTruthy();
    });

    it('shoud compare plain text with previous hashed text', async () => {
        const plain: string = uuidv4();
        const hashed: string = await sut.hash(plain);

        const isEquals: boolean = await sut.equals(plain, hashed);

        expect(isEquals).toBeTruthy();
    });

    it('shoud compare other plain text with previous hashed text', async () => {
        const plain: string = uuidv4();
        const plainBadToCompare: string = uuidv4();
        const hashed: string = await sut.hash(plain);

        const isEquals: boolean = await sut.equals(plainBadToCompare, hashed);

        expect(isEquals).toBeFalsy();
    });
});
