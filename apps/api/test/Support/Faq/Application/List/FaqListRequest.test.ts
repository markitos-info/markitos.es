import FaqListRequest from '../../../../../src/Services/Content/Faq/Application/List/FaqListRequest';
import FaqMother from '../../../FaqMother';
describe('FaqListRequest', () => {
    it('shoud create with an optionally pattern string', () => {
        const sut: FaqListRequest = FaqMother.FaqListRequest();

        expect(sut.pattern).toStrictEqual(FaqMother.FAQ_PATTERN);
    });
});
