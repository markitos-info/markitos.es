import Tokenator from '../../../../src/Services/Shared/Domain/Lib/Tokenator';
import TokenatorJWT from '../../../../src/Services/Shared/Infraestructure/TokenatorJWT';
import { SharedMother } from '../../SharedMother';

const sut: Tokenator = new TokenatorJWT();

describe('TokenatorJWT', () => {
    it('shoud create jwt token', async() => {
        const token = await sut.create(SharedMother.TOKEN_PAYLOAD, 9999);

        const decoded = await sut.decode(token);

        expect(decoded).toHaveProperty('payload');
        expect(decoded.protectedHeader).toMatchObject({ typ: 'JWT' });
    });
});
