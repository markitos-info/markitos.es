import Video from '../../Domain/Model/Video';
import VideoType from '../../Domain/Model/VideoType';
import VideoRepository from '../../Domain/Persistence/VideoRepository';
import VideoListRequest from './VideoListRequest';

class VideoListService {
    constructor(private readonly repository: VideoRepository) {}

    async execute(request: VideoListRequest): Promise<VideoType[]> {
        const collection: Video[] = await this.repository.list(request.pattern);
        return collection.map((video: Video) => video.toPrimitives());
    }
}

export default VideoListService;
