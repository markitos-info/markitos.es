import BadRequestException from '../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import { SharedMother } from '../../SharedMother';

describe('Base64Zip from string', () => {
    it('should create with valid base64 zip string', () => {
        expect(() => {
            SharedMother.Base64Zip();
        }).not.toThrow();
    });

    it('should throw a bad request exception on no valid base64 zip string', () => {
        expect(() => {
            SharedMother.Base64Zip('non-valid-base64');
        }).toThrowError(BadRequestException);
    });
});
