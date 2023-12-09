import VideoPlaylistRequest from '../../../../../src/Services/Content/Video/Application/Playlist/VideoPlaylistRequest';
import VideoPlaylistService from '../../../../../src/Services/Content/Video/Application/Playlist/VideoPlaylistService';
import VideoType from '../../../../../src/Services/Content/Video/Domain/Model/VideoType';
import VideoMother from '../../VideoMother';
import VideoRepositoryForTest from '../VideoRepositoryForTest';

const respository: VideoRepositoryForTest = new VideoRepositoryForTest();
const request: VideoPlaylistRequest = VideoMother.VideoPlaylistRequest();
const sut: VideoPlaylistService = VideoMother.VideoPlaylistService(respository);

describe('VideoPlaylistService', () => {
    it('shoud get a playlist response with a videos collection', async() => {
        const result: VideoType[] = await sut.execute(request);

        expect(respository.playlistCalled).toBeTruthy();
        expect(result.length).toBe(1);
        expect(result[0]).toStrictEqual(
            VideoMother.VideoToRead().toPrimitives()
        );
    });
});
