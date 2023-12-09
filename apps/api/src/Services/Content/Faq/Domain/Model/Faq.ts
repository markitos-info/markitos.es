import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import CommaTags from '../../../../Shared/Domain/ValueObject/CommaTags';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Title from '../../../../Shared/Domain/ValueObject/Title';
import Solution from '../ValueObject/Solution';
import FaqType from './FaqType';

class Faq implements ToPrimitiveTypeResult {
    private constructor(
        public readonly id: Id,
        public readonly title: Title,
        public readonly solution: Solution,
        public readonly tags: CommaTags,
        public readonly createdAt: Date
    ) {}

    public static create(
        id: Id,
        title: Title,
        solution: Solution,
        tags: CommaTags,
        createdAt?: Date
    ): Faq {
        let created: Date = new Date();
        if (createdAt !== undefined) {
            created = createdAt;
        }

        return new Faq(id, title, solution, tags, created);
    }

    public toPrimitives(): FaqType {
        return {
            id: this.id.value,
            title: this.title.value,
            solution: this.solution.value,
            tags: this.tags.value,
            createdAt: this.createdAt,
        };
    }
}

export default Faq;
