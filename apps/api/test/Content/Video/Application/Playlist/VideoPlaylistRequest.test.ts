import VideoPlaylistRequest from '../../../../../src/Services/Content/Video/Application/Playlist/VideoPlaylistRequest';
import VideoMother from '../../VideoMother';

describe('VideoPlaylistRequest', () => {
    it('shoud create with an optionally pattern string', () => {
        const sut: VideoPlaylistRequest = VideoMother.VideoPlaylistRequest();

        expect(sut.id).toStrictEqual(VideoMother.VIDEO_PLAYLIST_ID);
    });
});
