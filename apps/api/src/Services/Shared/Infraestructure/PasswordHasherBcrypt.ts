import * as bcrypt from 'bcrypt';
import PasswordHasher from '../Domain/Lib/PasswordHasher';

class PasswordHasherBcrypt implements PasswordHasher {
    async equals(plain: string, hashed: string): Promise<boolean> {
        const result = bcrypt.compare(plain, hashed);

        return result;
    }

    async hash(plain: string): Promise<string> {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(plain, salt);
    }
}

export default PasswordHasherBcrypt;
