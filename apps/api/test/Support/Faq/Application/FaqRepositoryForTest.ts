import Faq from '../../../../src/Services/Content/Faq/Domain/Model/Faq';
import FaqRepository from '../../../../src/Services/Content/Faq/Domain/Persistence/FaqRepository';
import Id from '../../../../src/Services/Shared/Domain/ValueObject/Id';
import FaqMother from '../../FaqMother';

class FaqRepositoryForTest implements FaqRepository {
    async list(pattern?: string | undefined): Promise<Faq[]> {
        this.listCalled = pattern === pattern;

        return [];
    }
    public listCalled: boolean = false;

    async delete(id: Id): Promise<void> {
        this.deletedCalled = id === id;
    }
    public deletedCalled: boolean = false;

    async get(id: Id): Promise<Faq> {
        id;
        this.getCalled = true;

        return FaqMother.FaqToRead();
    }
    public getCalled: boolean = false;

    async create(faq: Faq): Promise<void> {
        faq;
        this.createdCalled = true;
    }
    public createdCalled: boolean = false;
}

export default FaqRepositoryForTest;
