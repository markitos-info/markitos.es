import FaqCreateRequest from '../../../../../src/Services/Content/Faq/Application/Create/FaqCreateRequest';
import FaqCreateResponse from '../../../../../src/Services/Content/Faq/Application/Create/FaqCreateResponse';
import FaqCreateService from '../../../../../src/Services/Content/Faq/Application/Create/FaqCreateService';
import { SharedMother } from '../../../../Shared/SharedMother';
import FaqMother from '../../../FaqMother';
import FaqRepositoryForTest from '../FaqRepositoryForTest';

const respository: FaqRepositoryForTest = new FaqRepositoryForTest();
const request: FaqCreateRequest = FaqMother.FaqCreateRequest();
const sut: FaqCreateService = FaqMother.FaqCreateService(respository);

describe('FaqCreateService', () => {
    it('shoud create a faq', async() => {
        await sut.execute(request);

        expect(respository.createdCalled).toBeTruthy();
    });

    it('shoud result a response with create faq id', async() => {
        const result: FaqCreateResponse = await sut.execute(request);

        expect(result.id).toStrictEqual(SharedMother.VALID_ID);
    });
});
