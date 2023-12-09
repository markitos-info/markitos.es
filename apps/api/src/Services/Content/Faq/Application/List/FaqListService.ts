import Faq from '../../Domain/Model/Faq';
import FaqRepository from '../../Domain/Persistence/FaqRepository';
import FaqListRequest from './FaqListRequest';
import FaqListResponse from './FaqListResponse';

class FaqListService {
    constructor(private readonly repository: FaqRepository) {}

    async execute(request: FaqListRequest): Promise<FaqListResponse> {
        const collection: Faq[] = await this.repository.list(request.pattern);

        return new FaqListResponse(collection);
    }
}

export default FaqListService;
