import FaqCreateResponse from '../../../../../src/Services/Content/Faq/Application/Create/FaqCreateResponse';
import { SharedMother } from '../../../../Shared/SharedMother';
import FaqMother from '../../../FaqMother';

describe('FaqCreateResponse', () => {
    it('shoud create with an id', () => {
        const sut: FaqCreateResponse = FaqMother.FaqCreateResponse();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
    });
});
