import Base64ImageWriter from '../../../../Shared/Domain/Lib/Base64ImageWriter';
import CommaTags from '../../../../Shared/Domain/ValueObject/CommaTags';
import Description from '../../../../Shared/Domain/ValueObject/Description';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Poster from '../../../../Shared/Domain/ValueObject/Poster';
import Title from '../../../../Shared/Domain/ValueObject/Title';
import Youtube from '../../../../Shared/Domain/ValueObject/Youtube';
import Video from '../../Domain/Model/Video';
import VideoCreateReadModel from '../../Domain/Model/VideoCreateReadModel';
import VideoRepository from '../../Domain/Persistence/VideoRepository';
import PlaylistId from '../../Domain/ValueObject/PlaylistId';
import VideoCreateRequest from './VideoCreateRequest';
import VideoCreateResponse from './VideoCreateResponse';

class VideoCreateService {
    constructor(
        private readonly repository: VideoRepository,
        private readonly imagener: Base64ImageWriter
    ) {}

    async execute(request: VideoCreateRequest): Promise<VideoCreateReadModel> {
        request.poster = await this.imagener.write(request.poster);
        const video: Video = this.createVideoFromRequest(request);

        await this.repository.create(video);

        return new VideoCreateResponse(
            video.id.value,
            request.poster
        ).toPrimitives();
    }

    private createVideoFromRequest(request: VideoCreateRequest): Video {
        return Video.create(
            new Id(request.id),
            new Title(request.title),
            new Description(request.description),
            new CommaTags(request.tags),
            new Youtube(request.url),
            new Poster(request.poster),
            new Date(),
            new PlaylistId(<string>request.playlist),
            request.position
        );
    }
}

export default VideoCreateService;
