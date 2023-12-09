import TokenDecoded from './TokenDecoded';

interface Tokenator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    create(payload: any, timeoutInDays?: number): Promise<string>;
    decode(token: string): Promise<TokenDecoded>;
}

export default Tokenator;
