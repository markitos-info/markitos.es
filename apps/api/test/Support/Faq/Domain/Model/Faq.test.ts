import Faq from '../../../../../src/Services/Content/Faq/Domain/Model/Faq';
import Solution from '../../../../../src/Services/Content/Faq/Domain/ValueObject/Solution';
import BadRequestException from '../../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import CommaTags from '../../../../../src/Services/Shared/Domain/ValueObject/CommaTags';
import Id from '../../../../../src/Services/Shared/Domain/ValueObject/Id';
import Title from '../../../../../src/Services/Shared/Domain/ValueObject/Title';
import { SharedMother } from '../../../../Shared/SharedMother';
import FaqMother from '../../../FaqMother';

describe('Faq model', () => {
    it('should create statically to create new faq, created at will be generated', () => {
        const sut: Faq = FaqMother.FaqToCreate();

        expect(sut.title).toBeInstanceOf(Title);
        expect(sut.title.value).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.tags).toBeInstanceOf(CommaTags);
        expect(sut.tags.value).toStrictEqual(SharedMother.COMMA_TAGS_VALUE);
        expect(sut.solution).toBeInstanceOf(Solution);
        expect(sut.solution.value).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.createdAt).toBeInstanceOf(Date);
        expect(sut.id).toBeInstanceOf(Id);
        expect(sut.id.value).toStrictEqual(SharedMother.VALID_ID);
    });

    it('should create statically to read existing faq, created at its required', () => {
        const sut: Faq = FaqMother.FaqToRead();

        expect(sut.title).toBeInstanceOf(Title);
        expect(sut.title.value).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.tags).toBeInstanceOf(CommaTags);
        expect(sut.tags.value).toStrictEqual(SharedMother.COMMA_TAGS_VALUE);
        expect(sut.solution).toBeInstanceOf(Solution);
        expect(sut.solution.value).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.createdAt).toStrictEqual(FaqMother.FAQ_CREATED_AT);
        expect(sut.id.value).toStrictEqual(SharedMother.VALID_ID);
    });

    it('should throw a bad request exception on invalid title', () => {
        expect(() => {
            FaqMother.FaqToRead(undefined, 'a'.repeat(100));
        }).toThrow(BadRequestException);
    });

    it('should throw a bad request exception on invalid solution', () => {
        expect(() => {
            FaqMother.FaqToRead(undefined, undefined, 'no base64 text');
        }).toThrow(BadRequestException);
    });

    it('should throw a bad request exception on invalid id', () => {
        expect(() => {
            FaqMother.FaqToRead('non-valid-id');
        }).toThrow(BadRequestException);
    });
});
