import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import UserLoginRequest from '../../../../Services/Access/User/Application/Login/UserLoginRequest';
import UserLoginService from '../../../../Services/Access/User/Application/Login/UserLoginService';
import UserRepository from '../../../../Services/Access/User/Domain/Persistence/UserRepository';
import UserRepositoryMariaDB from '../../../../Services/Access/User/Infraestructure/Persistence/UserRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';
import PasswordHasher from '../../../../Services/Shared/Domain/Lib/PasswordHasher';
import Tokenator from '../../../../Services/Shared/Domain/Lib/Tokenator';
import PasswordHasherBcrypt from '../../../../Services/Shared/Infraestructure/PasswordHasherBcrypt';
import TokenatorJWT from '../../../../Services/Shared/Infraestructure/TokenatorJWT';

const hasher: PasswordHasher = new PasswordHasherBcrypt();
const repository: UserRepository = new UserRepositoryMariaDB();
const tokens: Tokenator = new TokenatorJWT();
const service: UserLoginService = new UserLoginService(
    repository,
    hasher,
    tokens
);

class UserLoginAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: UserLoginRequest = new UserLoginRequest(
                req.body.email,
                req.body.password
            );

            const response = await service.execute(request);

            res.status(HttpStatus.OK).json({
                success: true,
                result: { token: response.token },
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                result: { message: (<Error>error).message },
            });
        }
    }
}

export default UserLoginAction;
