import VideoGetRequest from '../../../../../src/Services/Content/Video/Application/Get/VideoGetRequest';
import VideoGetService from '../../../../../src/Services/Content/Video/Application/Get/VideoGetService';
import { SharedMother } from '../../../../Shared/SharedMother';
import VideoMother from '../../VideoMother';
import VideoRepositoryForTest from '../VideoRepositoryForTest';

const respository: VideoRepositoryForTest = new VideoRepositoryForTest();
const request: VideoGetRequest = VideoMother.VideoGetRequest();
const sut: VideoGetService = VideoMother.VideoGetService(respository);

describe('VideoGetService', () => {
    it('shoud get a video', async () => {
        await sut.execute(request);

        expect(respository.getCalled).toBeTruthy();
    });

    it('shoud contain split tags as array from comma string from toPrimitives', async () => {
        const response = await sut.execute(request);

        expect(response.tags_list).toStrictEqual(SharedMother.TAGS_VALUE);
    });
});
