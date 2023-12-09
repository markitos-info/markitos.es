import Base64Text from '../../../../src/Services/Shared/Domain/ValueObject/Base64Text';
import { SharedMother } from '../../SharedMother';

describe('Title', () => {
    it('should be a LimitedString with standard length (visit:LimitedString)', () => {
        expect(SharedMother.Title()).toBeInstanceOf(Base64Text);
    });
});
