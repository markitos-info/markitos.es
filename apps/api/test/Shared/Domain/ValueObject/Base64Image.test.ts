import BadRequestException from '../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import { SharedMother } from '../../SharedMother';

describe('ImageBase64 from string', () => {
    it('should create with valid jpg base64 image', () => {
        expect(() => {
            SharedMother.Base64Image();
        }).not.toThrow();
    });

    it('should throw a bad request exception on no valid base64', () => {
        expect(() => {
            SharedMother.Base64Image('non-valid-base64');
        }).toThrowError(BadRequestException);
    });

    it('should throw a bad request exception on valid base64 but its not a valid image', () => {
        expect(() => {
            SharedMother.Base64Image(SharedMother.BASE64_TEXT);
        }).toThrowError(BadRequestException);
        expect(() => {
            SharedMother.Base64Image(SharedMother.BASE64_SVG_IMAGE);
        }).toThrowError(BadRequestException);
    });
});
