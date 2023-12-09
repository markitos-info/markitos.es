import Tokenator from '../../../src/Services/Shared/Domain/Lib/Tokenator';
import TokenDecoded from '../../../src/Services/Shared/Domain/Lib/TokenDecoded';
import { SharedMother } from '../SharedMother';

class TokenatorForTest implements Tokenator {
    public createCalled: boolean = false;
    async create(payload: unknown): Promise<string> {
        payload;
        this.createCalled = true;

        return SharedMother.TOKEN_CREATED;
    }

    public decodeCalled: boolean = false;
    async decode(token: string): Promise<TokenDecoded> {
        token;
        this.decodeCalled = true;

        return {
            payload: SharedMother.TOKEN_PAYLOAD,
            protectedHeader: SharedMother.TOKEN_PAYLOAD,
        };
    }
}

export default TokenatorForTest;
