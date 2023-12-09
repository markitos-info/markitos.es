import VideoListResponse from '../../../../../src/Services/Content/Video/Application/List/VideoListResponse';
import VideoMother from '../../VideoMother';

describe('VideoListResponse', () => {
    it('shoud create with a list of videos', () => {
        const sut: VideoListResponse = VideoMother.VideoListResponse();

        expect(sut.list.length).toStrictEqual(1);
        expect(sut.list[0]).toStrictEqual(VideoMother.VideoToRead());
    });
});
