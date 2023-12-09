import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import FaqCreateRequest from '../../../../Services/Content/Faq/Application/Create/FaqCreateRequest';
import FaqCreateService from '../../../../Services/Content/Faq/Application/Create/FaqCreateService';
import FaqRepository from '../../../../Services/Content/Faq/Domain/Persistence/FaqRepository';
import FaqRepositoryMariaDB from '../../../../Services/Content/Faq/Infraestructure/Persistence/FaqRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';

const repository: FaqRepository = new FaqRepositoryMariaDB();
const service: FaqCreateService = new FaqCreateService(repository);

export class FaqCreateAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: FaqCreateRequest = new FaqCreateRequest(
                uuidv4(),
                req.body.title,
                req.body.solution,
                req.body.tags
            );

            await service.execute(request);

            res.status(HttpStatus.OK).send();
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).send((<Error>error).message);
        }
    }
}
