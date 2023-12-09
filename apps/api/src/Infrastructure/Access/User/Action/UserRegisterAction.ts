import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import UserRegisterRequest from '../../../../Services/Access/User/Application/Register/UserRegisterRequest';
import UserRegisterService from '../../../../Services/Access/User/Application/Register/UserRegisterService';
import UserRepository from '../../../../Services/Access/User/Domain/Persistence/UserRepository';
import UserRepositoryMariaDB from '../../../../Services/Access/User/Infraestructure/Persistence/UserRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';
import PasswordHasher from '../../../../Services/Shared/Domain/Lib/PasswordHasher';
import PasswordHasherBcrypt from '../../../../Services/Shared/Infraestructure/PasswordHasherBcrypt';

const hasher: PasswordHasher = new PasswordHasherBcrypt();
const repository: UserRepository = new UserRepositoryMariaDB();
const service: UserRegisterService = new UserRegisterService(
    repository,
    hasher
);

class UserRegisterAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: UserRegisterRequest = new UserRegisterRequest(
                uuidv4(),
                req.body.email,
                req.body.name,
                req.body.password
            );

            const response = await service.execute(request);

            res.status(HttpStatus.OK).json({
                success: true,
                result: { id: response.id },
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                result: { message: (<Error>error).message },
            });
        }
    }
}

export default UserRegisterAction;
