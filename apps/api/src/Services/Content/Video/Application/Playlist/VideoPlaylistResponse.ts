import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import Video from '../../Domain/Model/Video';
import VideoType from '../../Domain/Model/VideoType';

class VideoPlaylistResponse implements ToPrimitiveTypeResult {
    constructor(public readonly playlist: Video[]) {}

    toPrimitives(): VideoType[] {
        const result: VideoType[] = [];

        this.playlist.forEach(async (item: Video) => {
            result.push(await item.toPrimitives());
        });

        return result;
    }
}

export default VideoPlaylistResponse;
