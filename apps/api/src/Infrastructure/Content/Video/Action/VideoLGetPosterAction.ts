import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import VideoGetRequest from '../../../../Services/Content/Video/Application/Get/VideoGetRequest';
import VideoGetService from '../../../../Services/Content/Video/Application/Get/VideoGetService';
import VideoType from '../../../../Services/Content/Video/Domain/Model/VideoType';
import VideoRepository from '../../../../Services/Content/Video/Domain/Persistence/VideoRepository';
import VideoRepositoryMariaDB from '../../../../Services/Content/Video/Infraestructure/Persistence/VideoRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';
import BaseApiAction from '../../../../Services/Shared/Domain/Action/BaseApiAction';
import { cdnDir } from '../../../../Services/Shared/Domain/Lib/FsTools';

const repository: VideoRepository = new VideoRepositoryMariaDB();
const service: VideoGetService = new VideoGetService(repository);

export class VideoLGetPosterAction extends BaseApiAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: VideoGetRequest = new VideoGetRequest(req.params.id);
            const response: VideoType = await service.execute(request);

            res.status(HttpStatusCode.Ok).sendFile(cdnDir + response.poster);
        } catch (error) {
            this.failed(res, error as Error);
        }
    }
}
