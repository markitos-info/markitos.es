import Id from '../../../../Shared/Domain/ValueObject/Id';
import Video from '../../Domain/Model/Video';
import VideoType from '../../Domain/Model/VideoType';
import VideoRepository from '../../Domain/Persistence/VideoRepository';
import VideoGetRequest from './VideoGetRequest';

class VideoGetService {
    constructor(private readonly repository: VideoRepository) {}

    async execute(request: VideoGetRequest): Promise<VideoType> {
        const video: Video = await this.repository.get(new Id(request.id));

        return video.toPrimitives();
    }
}

export default VideoGetService;
