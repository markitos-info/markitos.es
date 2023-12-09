import { SignJWT, jwtVerify } from 'jose';
import TokenDecoded from '../Domain/Lib/TokenDecoded';
import Tokenator from '../Domain/Lib/Tokenator';

/**
 * @todo new priv key
 */
class TokenatorJWT implements Tokenator {
    async decode(token: string): Promise<TokenDecoded> {
        const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);
        const decoded = await jwtVerify(token, secret);

        return decoded;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async create(payload: any, timeoutInDays: number = 1): Promise<string> {
        const jwtConstructor = new SignJWT(payload);
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({
                alg: 'HS256',
                typ: 'JWT',
            })
            .setIssuedAt()
            .setExpirationTime(`${timeoutInDays}d`)
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        return jwt;
    }
}

export default TokenatorJWT;
