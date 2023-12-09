import { SharedMother } from '../../SharedMother';

describe('CommaTags', () => {
    it('should contain a only strings with comma(,) separator', () => {
        expect(SharedMother.CommaTags().value).toStrictEqual(
            SharedMother.COMMA_TAGS_VALUE
        );
    });

    it('should get as array', () => {
        expect(SharedMother.CommaTags().toArray()).toStrictEqual(
            SharedMother.TAGS_VALUE
        );
    });
});
