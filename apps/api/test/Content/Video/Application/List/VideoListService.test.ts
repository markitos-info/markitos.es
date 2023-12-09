import VideoListRequest from '../../../../../src/Services/Content/Video/Application/List/VideoListRequest';
import VideoListService from '../../../../../src/Services/Content/Video/Application/List/VideoListService';
import VideoMother from '../../VideoMother';
import VideoRepositoryForTest from '../VideoRepositoryForTest';

const respository: VideoRepositoryForTest = new VideoRepositoryForTest();
const request: VideoListRequest = VideoMother.VideoListRequest();
const sut: VideoListService = VideoMother.VideoListService(respository);

describe('VideoListService', () => {
    it('shoud get a list of videos collection', async() => {
        await sut.execute(request);

        expect(respository.listCalled).toBeTruthy();
    });
});
