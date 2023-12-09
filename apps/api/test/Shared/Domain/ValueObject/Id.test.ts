import Id from '../../../../src/Services/Shared/Domain/ValueObject/Id';
import { SharedMother } from '../../SharedMother';

describe('Id', () => {
    it('should be a string with 36 chars length', () => {
        expect(SharedMother.Id().value.length).toBe(36);
    });

    it('should validate statically an uuid v4 string value', () => {
        expect(Id.valid('no valid value')).toBeFalsy();
    });
});
