import { Request, Response } from 'express';
import VideoPlaylistRequest from '../../../../Services/Content/Video/Application/Playlist/VideoPlaylistRequest';
import VideoPlaylistService from '../../../../Services/Content/Video/Application/Playlist/VideoPlaylistService';
import VideoType from '../../../../Services/Content/Video/Domain/Model/VideoType';
import VideoRepository from '../../../../Services/Content/Video/Domain/Persistence/VideoRepository';
import VideoRepositoryMariaDB from '../../../../Services/Content/Video/Infraestructure/Persistence/VideoRepositoryMariaDB';
import { ApiAction } from '../../../../Services/Shared/Domain/Action/ApiAction';
import BaseApiAction from '../../../../Services/Shared/Domain/Action/BaseApiAction';
import { processVideo } from '../../../helpers';

const repository: VideoRepository = new VideoRepositoryMariaDB();
const service: VideoPlaylistService = new VideoPlaylistService(repository);

export class VideoPlaylistAction extends BaseApiAction implements ApiAction {
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const request: VideoPlaylistRequest = new VideoPlaylistRequest(
                req.params.id as string
            );
            const collection: VideoType[] = await service.execute(request);
            const response: VideoType[] = [];
            for (let video of collection) {
                video = await processVideo(req, video);
                response.push(video);
            }

            this.success(res, response);
        } catch (error) {
            console.log(error);

            this.failed(res, error as Error);
        }
    }
}
