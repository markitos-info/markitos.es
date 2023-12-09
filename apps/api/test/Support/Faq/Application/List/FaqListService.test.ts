import FaqListService from '../../../../../src/Services/Content/Faq/Application/List/FaqListService';
import FaqMother from '../../../FaqMother';
import FaqRepositoryForTest from '../FaqRepositoryForTest';

const respository: FaqRepositoryForTest = new FaqRepositoryForTest();
const sut: FaqListService = FaqMother.FaqListService(respository);

describe('FaqListService', () => {
    it('shoud get a list response with a faqs collection', async() => {
        await sut.execute(FaqMother.FaqListRequest());

        expect(respository.listCalled).toBeTruthy();
    });
});
