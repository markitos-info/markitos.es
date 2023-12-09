import Id from '../../../../Shared/Domain/ValueObject/Id';
import Video from '../Model/Video';

interface VideoRepository {
    create(video: Video): Promise<void>;
    delete(id: Id): Promise<void>;
    get(id: Id): Promise<Video>;
    list(pattern?: string): Promise<Video[]>;
    playlist(id: string): Promise<Video[]>;
}

export default VideoRepository;
