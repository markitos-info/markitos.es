import VideoListRequest from '../../../../../src/Services/Content/Video/Application/List/VideoListRequest';
import VideoMother from '../../VideoMother';

describe('VideoListRequest', () => {
    it('shoud create with an optionally pattern string', () => {
        const sut: VideoListRequest = VideoMother.VideoListRequest();

        expect(sut.pattern).toStrictEqual(VideoMother.VIDEO_PATTERN);
    });
});
