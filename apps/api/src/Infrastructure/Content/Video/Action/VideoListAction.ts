import { Request, Response } from 'express';
import VideoListRequest from '../../../../Services/Content/Video/Application/List/VideoListRequest';
import VideoListService from '../../../../Services/Content/Video/Application/List/VideoListService';
import VideoRepository from '../../../../Services/Content/Video/Domain/Persistence/VideoRepository';
import VideoRepositoryMariaDB from '../../../../Services/Content/Video/Infraestructure/Persistence/VideoRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';
import BaseApiAction from '../../../../Services/Shared/Domain/Action/BaseApiAction';
import { processVideo } from '../../../helpers';

const repository: VideoRepository = new VideoRepositoryMariaDB();
const service: VideoListService = new VideoListService(repository);

export class VideoListAction extends BaseApiAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: VideoListRequest = new VideoListRequest(
                (req.query.pattern as string) || ''
            );
            const response = await service.execute(request);
            response.map((video) => {
                return processVideo(req, video);
            });
            this.success(res, response);
        } catch (error) {
            this.failed(res, error as Error);
        }
    }
}
