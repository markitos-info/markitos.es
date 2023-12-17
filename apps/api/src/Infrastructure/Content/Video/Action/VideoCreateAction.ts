import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import VideoCreateRequest from '../../../../Services/Content/Video/Application/Create/VideoCreateRequest';
import VideoCreateService from '../../../../Services/Content/Video/Application/Create/VideoCreateService';
import VideoRepository from '../../../../Services/Content/Video/Domain/Persistence/VideoRepository';
import VideoRepositoryMariaDB from '../../../../Services/Content/Video/Infraestructure/Persistence/VideoRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';
import BaseApiAction from '../../../../Services/Shared/Domain/Action/BaseApiAction';
import Base64ImageWriter from '../../../../Services/Shared/Domain/Lib/Base64ImageWriter';
import Base64ImageWriterNodeBase64Image from '../../../../Services/Shared/Infraestructure/Base64ImageWriterNodeBase64Image';
import { getPosterUrl } from '../../../helpers';

const repository: VideoRepository = new VideoRepositoryMariaDB();
const imagener: Base64ImageWriter = new Base64ImageWriterNodeBase64Image();
const service: VideoCreateService = new VideoCreateService(
    repository,
    imagener
);

export class VideoCreateAction extends BaseApiAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: VideoCreateRequest = new VideoCreateRequest(
                uuidv4(),
                req.body.title,
                req.body.description,
                req.body.tags,
                req.body.url,
                req.body.poster,
                req.body.playlist,
                req.body.playlistTitle,
                req.body.position
            );

            const response = await service.execute(request);
            response.poster = getPosterUrl(req, response.id);
            this.success(res, response);
        } catch (error) {
            this.failed(res, error as Error);
        }
    }
}
