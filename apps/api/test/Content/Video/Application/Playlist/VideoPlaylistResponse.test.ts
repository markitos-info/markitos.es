import VideoPlaylistResponse from '../../../../../src/Services/Content/Video/Application/Playlist/VideoPlaylistResponse';
import VideoMother from '../../VideoMother';

describe('VideoPlaylistResponse', () => {
    it('shoud create with a playlist of videos', () => {
        const sut: VideoPlaylistResponse = VideoMother.VideoPlaylistResponse();

        expect(sut.playlist.length).toStrictEqual(1);
        expect(sut.playlist[0]).toStrictEqual(VideoMother.VideoToRead());
    });
});
