import LimitedString from '../../../../src/Services/Shared/Domain/ValueObject/LimitedString';
import { SharedMother } from '../../SharedMother';

describe('Limited string value object', () => {
    it(`should throw a child exception if char length its wrong, ${LimitedString.MINIMUM_LENGTH} - ${LimitedString.MAXIMUM_LENGTH}`, () => {
        expect(() => {
            SharedMother.LimitedString('');
        }).toThrow();
        expect(() => {
            SharedMother.LimitedString(
                'a'.repeat(LimitedString.MAXIMUM_LENGTH + 1)
            );
        }).toThrow();
    });

    it(`should not throw a child exception if char length its between ${LimitedString.MINIMUM_LENGTH} - ${LimitedString.MAXIMUM_LENGTH}`, () => {
        expect(() => {
            SharedMother.LimitedString(
                'a'.repeat(LimitedString.MINIMUM_LENGTH)
            );
        }).not.toThrow();
        expect(() => {
            SharedMother.LimitedString(
                'a'.repeat(LimitedString.MAXIMUM_LENGTH)
            );
        }).not.toThrow();
    });
});
