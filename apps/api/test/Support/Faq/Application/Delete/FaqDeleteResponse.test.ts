import FaqDeleteResponse from '../../../../../src/Services/Content/Faq/Application/Delete/FaqDeleteResponse';
import { SharedMother } from '../../../../Shared/SharedMother';
import FaqMother from '../../../FaqMother';

describe('FaqDeleteResponse', () => {
    it('shoud create with an id, title, solution and createdAt', () => {
        const sut: FaqDeleteResponse = FaqMother.FaqDeleteResponse();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
        expect(sut.title).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.solution).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.createdAt).toStrictEqual(FaqMother.FAQ_CREATED_AT);
    });
});
