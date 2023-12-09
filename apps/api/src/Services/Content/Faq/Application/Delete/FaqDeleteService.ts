import Id from '../../../../Shared/Domain/ValueObject/Id';
import FaqRepository from '../../Domain/Persistence/FaqRepository';
import FaqDeleteRequest from './FaqDeleteRequest';

class FaqDeleteService {
    constructor(private readonly repository: FaqRepository) {}

    async execute(request: FaqDeleteRequest): Promise<void> {
        await this.repository.delete(new Id(request.id));
    }
}

export default FaqDeleteService;
