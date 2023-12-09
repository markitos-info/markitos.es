import PasswordHasher from '../../../src/Services/Shared/Domain/Lib/PasswordHasher';

class PasswordHasherForTest implements PasswordHasher {
    public equalsCalled: boolean = false;
    async equals(plain: string, hash: string): Promise<boolean> {
        this.equalsCalled =
            typeof plain === 'string' && typeof hash === 'string';
        return true;
    }

    public hashCalled: boolean = false;
    async hash(plain: string): Promise<string> {
        this.hashCalled = typeof plain === 'string';
        return plain;
    }

    reset(): void {
        this.hashCalled = false;
        this.equalsCalled = false;
    }
}

export default PasswordHasherForTest;
