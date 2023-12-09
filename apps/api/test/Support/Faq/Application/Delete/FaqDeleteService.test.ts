import FaqDeleteRequest from '../../../../../src/Services/Content/Faq/Application/Delete/FaqDeleteRequest';
import FaqDeleteService from '../../../../../src/Services/Content/Faq/Application/Delete/FaqDeleteService';
import FaqMother from '../../../FaqMother';
import FaqRepositoryForTest from '../FaqRepositoryForTest';

const respository: FaqRepositoryForTest = new FaqRepositoryForTest();
const request: FaqDeleteRequest = FaqMother.FaqDeleteRequest();
const sut: FaqDeleteService = FaqMother.FaqDeleteService(respository);

describe('FaqDeleteService', () => {
    it('shoud delete a faq', async () => {
        await sut.execute(request);

        expect(respository.deletedCalled).toBeTruthy();
    });
});
