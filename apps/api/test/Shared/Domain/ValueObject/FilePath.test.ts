import BadRequestException from '../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import { SharedMother } from '../../SharedMother';

describe('FilePath', () => {
    it('should create with existing phisically file into fs', () => {
        expect(() => {
            SharedMother.FilePath();
        }).not.toThrow();
    });
    it('should throw bad request exception if file dont exists or its a directory', () => {
        expect(() => {
            SharedMother.FilePath('non-existing-file');
        }).toThrowError(BadRequestException);
        expect(() => {
            SharedMother.FilePath(__dirname);
            SharedMother.FilePath('/');
            SharedMother.FilePath('/tmp');
        }).toThrowError(BadRequestException);
    });
});
