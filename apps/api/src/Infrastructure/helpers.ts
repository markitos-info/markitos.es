import { Request } from 'express';
import { URL } from 'url';
import VideoType from '../Services/Content/Video/Domain/Model/VideoType';
import Base64Danko from '../Services/Shared/Infraestructure/Base64ToolDanko';

export const getPosterUrl = (req: Request, videoId: string): string => {
    let path = (req.route.path as string)
        .replace('playlists', 'videos')
        .replace(':id', videoId);
    path = path.includes(videoId) ? path : path + '/' + videoId;

    return new URL(
        `${req.protocol}://${req.get('host')}${path}/poster`
    ).toString();
};

export const processVideo = async(
    req: Request,
    video: VideoType
): Promise<VideoType> => {
    video.poster = getPosterUrl(req, video.id);
    video.title = await Base64Danko.fromBase64ToString(video.title);
    video.description = await Base64Danko.fromBase64ToString(video.description);

    return video;
};
