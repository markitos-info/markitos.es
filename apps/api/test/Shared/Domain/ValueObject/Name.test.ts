import BadRequestException from '../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import Name from '../../../../src/Services/Shared/Domain/ValueObject/Name';
import { SharedMother } from '../../SharedMother';

describe('Name', () => {
    it(`should be valid only letters between ${Name.MAXIMUM_TAG_LENGTH} and ${Name.MINIMUM_TAG_LENGTH}`, () => {
        expect(() => {
            SharedMother.Name('a'.repeat(Name.MAXIMUM_TAG_LENGTH));
            SharedMother.Name('a'.repeat(Name.MINIMUM_TAG_LENGTH));
        }).not.toThrowError();
    });

    it('should turn off the world if name not contain only letters', () => {
        expect(() => {
            SharedMother.Name('non-valid-name');
        }).toThrowError();
        expect(() => {
            SharedMother.Name('123');
        }).toThrowError();
        expect(() => {
            SharedMother.Name('myname123456');
        }).toThrowError();
        expect(() => {
            SharedMother.Name('a'.repeat(Name.MINIMUM_TAG_LENGTH - 1));
        }).toThrowError();
        expect(() => {
            SharedMother.Name('a'.repeat(Name.MAXIMUM_TAG_LENGTH + 1));
        }).toThrowError();
    });

    it('should be a domain exception', () => {
        expect(() => {
            SharedMother.Name('non-valid-name');
        }).toThrow(BadRequestException);
    });
});
