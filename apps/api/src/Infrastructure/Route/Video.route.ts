import { Request, Response, Router } from 'express';
import { ApiAction } from '../../Services/Shared/Domain/Action/ApiAction';
import { VideoCreateAction } from '../Content/Video/Action/VideoCreateAction';
import { VideoGetAction } from '../Content/Video/Action/VideoGetAction';
import { VideoLGetPosterAction } from '../Content/Video/Action/VideoLGetPosterAction';
import { VideoListAction } from '../Content/Video/Action/VideoListAction';
import { VideoPlaylistAction } from '../Content/Video/Action/VideoPlaylistAction';

export const register = (router: Router) => {
    router.get('/api/v1/videos', (req: Request, res: Response) => {
        const feature: ApiAction = new VideoListAction();
        feature.execute(req, res);
    });
    router.get('/api/v1/videos/:id', (req: Request, res: Response) => {
        const feature: ApiAction = new VideoGetAction();
        feature.execute(req, res);
    });
    router.post('/api/v1/videos', (req: Request, res: Response) => {
        const feature: ApiAction = new VideoCreateAction();
        feature.execute(req, res);
    });
    router.get('/api/v1/videos/:id/poster', (req: Request, res: Response) => {
        const feature: ApiAction = new VideoLGetPosterAction();
        feature.execute(req, res);
    });

    router.get('/api/v1/playlists/:id', (req: Request, res: Response) => {
        const feature: ApiAction = new VideoPlaylistAction();
        feature.execute(req, res);
    });
};
