import FaqCreateRequest from '../../src/Services/Content/Faq/Application/Create/FaqCreateRequest';
import FaqCreateResponse from '../../src/Services/Content/Faq/Application/Create/FaqCreateResponse';
import FaqCreateService from '../../src/Services/Content/Faq/Application/Create/FaqCreateService';
import FaqDeleteRequest from '../../src/Services/Content/Faq/Application/Delete/FaqDeleteRequest';
import FaqDeleteResponse from '../../src/Services/Content/Faq/Application/Delete/FaqDeleteResponse';
import FaqDeleteService from '../../src/Services/Content/Faq/Application/Delete/FaqDeleteService';
import FaqListRequest from '../../src/Services/Content/Faq/Application/List/FaqListRequest';
import FaqListResponse from '../../src/Services/Content/Faq/Application/List/FaqListResponse';
import FaqListService from '../../src/Services/Content/Faq/Application/List/FaqListService';
import Faq from '../../src/Services/Content/Faq/Domain/Model/Faq';
import FaqRepository from '../../src/Services/Content/Faq/Domain/Persistence/FaqRepository';
import Solution from '../../src/Services/Content/Faq/Domain/ValueObject/Solution';
import { SharedMother } from '../Shared/SharedMother';

class FaqMother {
    public static FAQ_CREATED_AT: Date = new Date();
    public static FAQ_PATTERN: string = 'aaa';

    public static FaqListService(repository: FaqRepository): FaqListService {
        return new FaqListService(repository);
    }

    public static FaqDeleteService(
        repository: FaqRepository
    ): FaqDeleteService {
        return new FaqDeleteService(repository);
    }

    public static FaqCreateService(
        repository: FaqRepository
    ): FaqCreateService {
        return new FaqCreateService(repository);
    }

    public static FaqDeleteResponse(): FaqDeleteResponse {
        return new FaqDeleteResponse(
            SharedMother.VALID_ID,
            SharedMother.BASE64_TEXT,
            SharedMother.BASE64_TEXT,
            FaqMother.FAQ_CREATED_AT
        );
    }

    public static FaqDeleteRequest(): FaqDeleteRequest {
        return new FaqDeleteRequest(SharedMother.VALID_ID);
    }

    public static FaqCreateResponse(): FaqCreateResponse {
        return new FaqCreateResponse(SharedMother.VALID_ID);
    }

    public static FaqListRequest(): FaqListRequest {
        return new FaqListRequest(FaqMother.FAQ_PATTERN);
    }

    public static FaqListResponse(): FaqListResponse {
        return new FaqListResponse([]);
    }

    public static FaqCreateRequest(
        id?: string,
        title?: string,
        solution?: string,
        tags?: string
    ): FaqCreateRequest {
        return new FaqCreateRequest(
            id !== undefined ? id : SharedMother.Id().value,
            title !== undefined ? title : SharedMother.BASE64_TEXT,
            solution !== undefined ? solution : SharedMother.BASE64_TEXT,
            tags !== undefined ? tags : SharedMother.CommaTags().value
        );
    }

    public static FaqToCreate(): Faq {
        return Faq.create(
            SharedMother.Id(),
            SharedMother.Title(),
            FaqMother.Solution(),
            SharedMother.CommaTags()
        );
    }

    public static FaqToRead(
        id?: string,
        title?: string,
        solution?: string
    ): Faq {
        return Faq.create(
            SharedMother.Id(id),
            SharedMother.Title(title),
            FaqMother.Solution(solution),
            SharedMother.CommaTags(),
            FaqMother.FAQ_CREATED_AT
        );
    }

    public static Solution(value?: string): Solution {
        return new Solution(
            value !== undefined ? value : SharedMother.BASE64_TEXT
        );
    }
}

export default FaqMother;
