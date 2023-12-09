import FaqDeleteRequest from '../../../../../src/Services/Content/Faq/Application/Delete/FaqDeleteRequest';
import { SharedMother } from '../../../../Shared/SharedMother';
import FaqMother from '../../../FaqMother';

describe('FaqDeleteRequest', () => {
    it('shoud create with an id', () => {
        const sut: FaqDeleteRequest = FaqMother.FaqDeleteRequest();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
    });
});
