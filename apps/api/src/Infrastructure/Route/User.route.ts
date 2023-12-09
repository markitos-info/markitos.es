import { Request, Response, Router } from 'express';
import { ApiAction } from '../../Services/Shared/Domain/Action/ApiAction';
import UserGetAction from '../Access/User/Action/UserGetAction';
import UserListAction from '../Access/User/Action/UserListAction';
import UserLoginAction from '../Access/User/Action/UserLoginAction';
import UserRegisterAction from '../Access/User/Action/UserRegisterAction';

export const register = (router: Router) => {
    router.get('/api/v1/users', (req: Request, res: Response) => {
        const feature: ApiAction = new UserListAction();
        feature.execute(req, res);
    });

    router.get('/api/v1/users/:id', (req: Request, res: Response) => {
        const feature: ApiAction = new UserGetAction();
        feature.execute(req, res);
    });

    router.post('/api/v1/users', (req: Request, res: Response) => {
        const feature: ApiAction = new UserRegisterAction();
        feature.execute(req, res);
    });

    router.post('/api/v1/login', (req: Request, res: Response) => {
        const feature: ApiAction = new UserLoginAction();
        feature.execute(req, res);
    });
};
