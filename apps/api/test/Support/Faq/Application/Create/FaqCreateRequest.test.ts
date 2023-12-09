import FaqCreateRequest from '../../../../../src/Services/Content/Faq/Application/Create/FaqCreateRequest';
import { SharedMother } from '../../../../Shared/SharedMother';
import FaqMother from '../../../FaqMother';

describe('FaqCreateRequest', () => {
    it('shoud create with an id, title and solution as string', () => {
        const sut: FaqCreateRequest = FaqMother.FaqCreateRequest();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
        expect(sut.title).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.solution).toStrictEqual(SharedMother.BASE64_TEXT);
    });
});
