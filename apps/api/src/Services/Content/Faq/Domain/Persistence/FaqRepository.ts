import Id from '../../../../Shared/Domain/ValueObject/Id';
import Faq from '../Model/Faq';

interface FaqRepository {
    create(faq: Faq): Promise<void>;
    delete(id: Id): Promise<void>;
    get(id: Id): Promise<Faq>;
    list(pattern?: string): Promise<Faq[]>;
}

export default FaqRepository;
