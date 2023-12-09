import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import UserListRequest from '../../../../Services/Access/User/Application/List/UserListRequest';
import UserListResponse from '../../../../Services/Access/User/Application/List/UserListResponse';
import UserListService from '../../../../Services/Access/User/Application/List/UserListService';
import UserRepository from '../../../../Services/Access/User/Domain/Persistence/UserRepository';
import UserRepositoryMariaDB from '../../../../Services/Access/User/Infraestructure/Persistence/UserRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';

const repository: UserRepository = new UserRepositoryMariaDB();
const service: UserListService = new UserListService(repository);

class UserListAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: UserListRequest = new UserListRequest(
                (req.query.pattern as string) || ''
            );
            const response: UserListResponse = await service.execute(request);

            res.status(HttpStatus.OK).send(response.toPrimitives());
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).send((<Error>error).message);
        }
    }
}

export default UserListAction;
