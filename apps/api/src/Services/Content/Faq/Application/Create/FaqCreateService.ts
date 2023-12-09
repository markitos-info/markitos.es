import CommaTags from '../../../../Shared/Domain/ValueObject/CommaTags';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Title from '../../../../Shared/Domain/ValueObject/Title';
import Faq from '../../Domain/Model/Faq';
import FaqRepository from '../../Domain/Persistence/FaqRepository';
import Solution from '../../Domain/ValueObject/Solution';
import FaqCreateRequest from './FaqCreateRequest';
import FaqCreateResponse from './FaqCreateResponse';

class FaqCreateService {
    constructor(private readonly repository: FaqRepository) {}

    async execute(request: FaqCreateRequest): Promise<FaqCreateResponse> {
        const faq: Faq = this.createFaqFromRequest(request);

        await this.repository.create(faq);

        return new FaqCreateResponse(faq.id.value);
    }

    private createFaqFromRequest(request: FaqCreateRequest): Faq {
        return Faq.create(
            new Id(request.id),
            new Title(request.title),
            new Solution(request.solution),
            new CommaTags(request.tags)
        );
    }
}

export default FaqCreateService;
