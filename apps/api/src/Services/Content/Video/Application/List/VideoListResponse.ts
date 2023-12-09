import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import Video from '../../Domain/Model/Video';
import VideoType from '../../Domain/Model/VideoType';

class VideoListResponse implements ToPrimitiveTypeResult {
    constructor(public readonly list: Video[]) {}

    toPrimitives(): VideoType[] {
        const result: VideoType[] = [];

        this.list.forEach((item: Video) => {
            result.push(item.toPrimitives());
        });

        return result;
    }
}

export default VideoListResponse;
