import Id from '../../../../Shared/Domain/ValueObject/Id';
import VideoRepository from '../../Domain/Persistence/VideoRepository';
import VideoDeleteRequest from './VideoDeleteRequest';

class VideoDeleteService {
    constructor(private readonly repository: VideoRepository) {}

    async execute(request: VideoDeleteRequest): Promise<void> {
        await this.repository.delete(new Id(request.id));
    }
}

export default VideoDeleteService;
