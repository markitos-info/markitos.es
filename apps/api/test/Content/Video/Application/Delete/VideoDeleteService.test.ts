import VideoDeleteRequest from '../../../../../src/Services/Content/Video/Application/Delete/VideoDeleteRequest';
import VideoDeleteService from '../../../../../src/Services/Content/Video/Application/Delete/VideoDeleteService';
import VideoMother from '../../VideoMother';
import VideoRepositoryForTest from '../VideoRepositoryForTest';

const respository: VideoRepositoryForTest = new VideoRepositoryForTest();
const request: VideoDeleteRequest = VideoMother.VideoDeleteRequest();
const sut: VideoDeleteService = VideoMother.VideoDeleteService(respository);

describe('VideoDeleteService', () => {
    it('shoud delete a video', async () => {
        await sut.execute(request);

        expect(respository.deletedCalled).toBeTruthy();
    });
});
