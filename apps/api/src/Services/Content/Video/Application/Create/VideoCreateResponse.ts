import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import VideoCreateReadModel from '../../Domain/Model/VideoCreateReadModel';

class VideoCreateResponse implements ToPrimitiveTypeResult {
    constructor(
        public readonly id: string,
        public readonly poster: string
    ) {}

    toPrimitives(): VideoCreateReadModel {
        return { ...this };
    }
}

export default VideoCreateResponse;
