import { SharedMother } from '../../SharedMother';

describe('Tags', () => {
    it('should contain a only letters array of strings', () => {
        expect(SharedMother.Tags().value).toStrictEqual(
            SharedMother.TAGS_VALUE
        );
    });
});
