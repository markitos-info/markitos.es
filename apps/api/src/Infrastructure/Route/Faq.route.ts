import { Request, Response, Router } from 'express';
import { ApiAction } from '../../Services/Shared/Domain/Action/ApiAction';
import { FaqCreateAction } from '../Content/Faq/Action/FaqCreateAction';
import { FaqListAction } from '../Content/Faq/Action/FaqListAction';

export const register = (router: Router) => {
    router.get('/api/v1/faqs', (req: Request, res: Response) => {
        const feature: ApiAction = new FaqListAction();
        feature.execute(req, res);
    });
    router.post('/api/v1/faqs', (req: Request, res: Response) => {
        const feature: ApiAction = new FaqCreateAction();
        feature.execute(req, res);
    });
};
