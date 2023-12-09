import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import Faq from '../../Domain/Model/Faq';
import FaqType from '../../Domain/Model/FaqType';

class FaqListResponse implements ToPrimitiveTypeResult {
    constructor(public readonly list: Faq[]) {}

    toPrimitives(): FaqType[] {
        return this.list.map((item: Faq) => {
            return item.toPrimitives();
        });
    }
}

export default FaqListResponse;
