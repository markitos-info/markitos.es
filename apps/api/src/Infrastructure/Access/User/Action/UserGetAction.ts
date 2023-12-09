import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import UserGetRequest from '../../../../Services/Access/User/Application/Get/UserGetRequest';
import UserGetService from '../../../../Services/Access/User/Application/Get/UserGetService';
import UserRepository from '../../../../Services/Access/User/Domain/Persistence/UserRepository';
import UserRepositoryMariaDB from '../../../../Services/Access/User/Infraestructure/Persistence/UserRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';

const repository: UserRepository = new UserRepositoryMariaDB();
const service: UserGetService = new UserGetService(repository);

class UserGetAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: UserGetRequest = new UserGetRequest(req.params.id);
            const response = await service.execute(request);

            res.status(HttpStatus.OK).json({
                success: true,
                result: response.toPrimitives(),
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                result: { message: (<Error>error).message },
            });
        }
    }
}

export default UserGetAction;
