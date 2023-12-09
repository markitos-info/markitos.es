import Video from '../../Domain/Model/Video';
import VideoType from '../../Domain/Model/VideoType';
import VideoRepository from '../../Domain/Persistence/VideoRepository';
import VideoPlaylistRequest from './VideoPlaylistRequest';
import VideoPlaylistResponse from './VideoPlaylistResponse';

class VideoPlaylistService {
    constructor(private readonly repository: VideoRepository) {}

    async execute(request: VideoPlaylistRequest): Promise<VideoType[]> {
        const collection: Video[] = await this.repository.playlist(request.id);

        return new VideoPlaylistResponse(collection).toPrimitives();
    }
}

export default VideoPlaylistService;
