import Base64ImageWriter from '../../../../src/Services/Shared/Domain/Lib/Base64ImageWriter';

class Base64ImageWriterForTest implements Base64ImageWriter {
    static writeCalled: boolean;
    async write(filenameWithAbsolutePath: string): Promise<string> {
        Base64ImageWriterForTest.writeCalled =
            filenameWithAbsolutePath === filenameWithAbsolutePath;

        return crypto.randomUUID() + '.png';
    }
}

export default Base64ImageWriterForTest;
