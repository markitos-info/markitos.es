import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import UserRegisterRequest from '../../../../../src/Services/Access/User/Application/Register/UserRegisterRequest';
import UserRegisterService from '../../../../../src/Services/Access/User/Application/Register/UserRegisterService';
import User from '../../../../../src/Services/Access/User/Domain/Model/User';
import UserRepository from '../../../../../src/Services/Access/User/Domain/Persistence/UserRepository';
import UserRepositoryMariaDB from '../../../../../src/Services/Access/User/Infraestructure/Persistence/UserRepositoryMariaDB';
import NotFoundException from '../../../../../src/Services/Shared/Domain/Exception/NotFoundException';
import Id from '../../../../../src/Services/Shared/Domain/ValueObject/Id';
import PasswordHasherForTest from '../../../../Shared/Infraestructure/PasswordHasherForTest';
import UserMother from '../../UserMother';

const sut: UserRepository = new UserRepositoryMariaDB();
const hasher: PasswordHasherForTest = new PasswordHasherForTest();
const creator: UserRegisterService = UserMother.UserRegisterService(
    sut,
    hasher
);

describe('UserRepositoryMariaDB', () => {
    it('shoud create a user', async () => {
        const id: string = uuidv4();
        const createRequest: UserRegisterRequest =
            UserMother.UserRegisterRequest(
                id,
                undefined,
                faker.internet.email()
            );

        expect(async () => {
            await creator.execute(createRequest);
            await sut.delete(new Id(createRequest.id));
        }).not.toThrow();
    });

    it('shoud get an existing user', async () => {
        const id: string = uuidv4();
        const createRequest: UserRegisterRequest =
            UserMother.UserRegisterRequest(
                id,
                undefined,
                faker.internet.email()
            );

        await creator.execute(createRequest);

        const user: User = await sut.get(new Id(id));
        expect(user.id.value).toStrictEqual(id);

        await sut.delete(new Id(id));
    });

    it('shoud delete an existing user', async () => {
        const id: string = uuidv4();
        const createRequest: UserRegisterRequest =
            UserMother.UserRegisterRequest(
                id,
                undefined,
                faker.internet.email()
            );
        await creator.execute(createRequest);

        await sut.delete(new Id(createRequest.id));

        try {
            await sut.get(new Id(createRequest.id));
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });

    it('shoud list users without pattern', () => {
        expect(async () => {
            const createRequest1: UserRegisterRequest =
                UserMother.UserRegisterRequest(
                    uuidv4(),
                    undefined,
                    faker.internet.email()
                );
            await creator.execute(createRequest1);

            const createRequest2: UserRegisterRequest =
                UserMother.UserRegisterRequest(
                    uuidv4(),
                    undefined,
                    faker.internet.email()
                );
            await creator.execute(createRequest2);

            const collection: User[] = await sut.list();

            expect(collection.length).toBeGreaterThanOrEqual(2);
            expect(createRequest1.id).toStrictEqual(collection[0].id.value);
            expect(createRequest2.id).toStrictEqual(collection[1].id.value);

            await sut.delete(new Id(createRequest1.id));
            await sut.delete(new Id(createRequest2.id));
        });
    });

    it('shoud list users with a pattern (search in title and description)', () => {
        const prefixToSearch: string =
            Date.now().toString(36) + Math.random().toString(36).substring(2);

        expect(async () => {
            const createRequest1: UserRegisterRequest =
                UserMother.UserRegisterRequest(
                    uuidv4(),
                    prefixToSearch + 'uno',
                    faker.internet.email()
                );
            await creator.execute(createRequest1);

            const createRequest2: UserRegisterRequest =
                UserMother.UserRegisterRequest(
                    uuidv4(),
                    prefixToSearch + 'dos',
                    faker.internet.email()
                );
            await creator.execute(createRequest2);

            const collection: User[] = await sut.list(prefixToSearch);

            expect(collection.length).toBeGreaterThanOrEqual(2);
            expect(createRequest1.id).toStrictEqual(collection[0].id.value);
            expect(createRequest2.id).toStrictEqual(collection[1].id.value);

            await sut.delete(new Id(createRequest1.id));
            await sut.delete(new Id(createRequest2.id));
        });
    });
});
