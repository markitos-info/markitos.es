interface PasswordHasher {
    hash(plain: string): Promise<string>;
    equals(plain: string, hash: string): Promise<boolean>;
}

export default PasswordHasher;
