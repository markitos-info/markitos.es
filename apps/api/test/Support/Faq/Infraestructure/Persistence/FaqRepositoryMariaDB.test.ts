import FaqCreateRequest from '../../../../../src/Services/Content/Faq/Application/Create/FaqCreateRequest';
import FaqCreateService from '../../../../../src/Services/Content/Faq/Application/Create/FaqCreateService';
import Faq from '../../../../../src/Services/Content/Faq/Domain/Model/Faq';
import FaqRepository from '../../../../../src/Services/Content/Faq/Domain/Persistence/FaqRepository';
import FaqRepositoryMariaDB from '../../../../../src/Services/Content/Faq/Infraestructure/Persistence/FaqRepositoryMariaDB';
import NotFoundException from '../../../../../src/Services/Shared/Domain/Exception/NotFoundException';
import Id from '../../../../../src/Services/Shared/Domain/ValueObject/Id';
import { SharedMother } from '../../../../Shared/SharedMother';
import FaqMother from '../../../FaqMother';

const faqs: FaqRepository = new FaqRepositoryMariaDB();
const creator: FaqCreateService = FaqMother.FaqCreateService(faqs);
const createRequest: FaqCreateRequest = FaqMother.FaqCreateRequest();

describe('FaqCreateService', () => {
    it('shoud create a faq', () => {
        expect(async() => {
            await creator.execute(createRequest);

            await faqs.delete(new Id(createRequest.id));
        }).not.toThrow();
    });

    it('shoud get an existing faq', () => {
        expect(async() => {
            await creator.execute(createRequest);

            const faq: Faq = await faqs.get(new Id(createRequest.id));

            expect(SharedMother.VALID_ID).toStrictEqual(faq.id.value);

            await faqs.delete(new Id(createRequest.id));
        });
    });

    it('shoud delete an existing faq', () => {
        async() => {
            await creator.execute(createRequest);
            await faqs.delete(new Id(createRequest.id));

            try {
                await faqs.get(new Id(createRequest.id));
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        };
    });

    it('shoud list faqs without pattern', () => {
        expect(async() => {
            await creator.execute(createRequest);
            await creator.execute(
                FaqMother.FaqCreateRequest(SharedMother.VALID_ID_2)
            );

            const collection: Faq[] = await faqs.list();

            expect(collection.length).toBeGreaterThanOrEqual(2);
            expect(SharedMother.VALID_ID).toStrictEqual(collection[0].id.value);
            expect(SharedMother.VALID_ID_2).toStrictEqual(
                collection[1].id.value
            );

            await faqs.delete(new Id(SharedMother.VALID_ID));
            await faqs.delete(new Id(SharedMother.VALID_ID_2));
        });
    });

    it('shoud list faqs with a pattern (search in title and solution)', () => {
        const prefixToSearch: string =
            Date.now().toString(36) + Math.random().toString(36).substring(2);

        expect(async() => {
            await creator.execute(
                FaqMother.FaqCreateRequest(SharedMother.VALID_ID)
            );
            await creator.execute(
                FaqMother.FaqCreateRequest(
                    SharedMother.VALID_ID_2,
                    prefixToSearch + ' title 1'
                )
            );
            await creator.execute(
                FaqMother.FaqCreateRequest(
                    SharedMother.VALID_ID_3,
                    prefixToSearch + ' title 2'
                )
            );

            const collection: Faq[] = await faqs.list(prefixToSearch);

            expect(collection.length).toBeGreaterThanOrEqual(2);
            expect(SharedMother.VALID_ID).toStrictEqual(collection[0].id.value);
            expect(SharedMother.VALID_ID_2).toStrictEqual(
                collection[1].id.value
            );

            await faqs.delete(new Id(SharedMother.VALID_ID));
            await faqs.delete(new Id(SharedMother.VALID_ID_2));
        });
    });
});
