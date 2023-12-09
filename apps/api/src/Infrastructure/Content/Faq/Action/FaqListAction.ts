import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import FaqListRequest from '../../../../Services/Content/Faq/Application/List/FaqListRequest';
import FaqListResponse from '../../../../Services/Content/Faq/Application/List/FaqListResponse';
import FaqListService from '../../../../Services/Content/Faq/Application/List/FaqListService';
import FaqRepository from '../../../../Services/Content/Faq/Domain/Persistence/FaqRepository';
import FaqRepositoryMariaDB from '../../../../Services/Content/Faq/Infraestructure/Persistence/FaqRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';

const repository: FaqRepository = new FaqRepositoryMariaDB();
const service: FaqListService = new FaqListService(repository);

export class FaqListAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: FaqListRequest = new FaqListRequest(
                (req.query.pattern as string) || ''
            );
            const response: FaqListResponse = await service.execute(request);

            res.status(HttpStatus.OK).send(response.toPrimitives());
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).send((<Error>error).message);
        }
    }
}
