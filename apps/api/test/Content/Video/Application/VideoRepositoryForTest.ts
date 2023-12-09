import Video from '../../../../src/Services/Content/Video/Domain/Model/Video';
import VideoRepository from '../../../../src/Services/Content/Video/Domain/Persistence/VideoRepository';

import Id from '../../../../src/Services/Shared/Domain/ValueObject/Id';

import VideoMother from '../VideoMother';
class VideoRepositoryForTest implements VideoRepository {
    public listCalled: boolean = false;
    async list(pattern?: string | undefined): Promise<Video[]> {
        pattern === pattern;
        this.listCalled = true;

        return [];
    }
    public playlistCalled: boolean = false;
    async playlist(pattern?: string | undefined): Promise<Video[]> {
        pattern === pattern;
        this.playlistCalled = true;

        return [VideoMother.VideoToRead()];
    }

    async delete(id: Id): Promise<void> {
        this.deletedCalled = id === id;
    }
    public deletedCalled: boolean = false;

    async get(id: Id): Promise<Video> {
        this.getCalled = id === id;

        return VideoMother.VideoToRead();
    }
    public getCalled: boolean = false;

    async create(video: Video): Promise<void> {
        this.createdCalled = true;
        video;
    }
    public createdCalled: boolean = false;
}

export default VideoRepositoryForTest;
