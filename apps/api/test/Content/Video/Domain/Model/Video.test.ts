import Video from '../../../../../src/Services/Content/Video/Domain/Model/Video';
import PlaylistId from '../../../../../src/Services/Content/Video/Domain/ValueObject/PlaylistId';
import CommaTags from '../../../../../src/Services/Shared/Domain/ValueObject/CommaTags';
import Description from '../../../../../src/Services/Shared/Domain/ValueObject/Description';
import Id from '../../../../../src/Services/Shared/Domain/ValueObject/Id';
import Poster from '../../../../../src/Services/Shared/Domain/ValueObject/Poster';
import Title from '../../../../../src/Services/Shared/Domain/ValueObject/Title';
import Youtube from '../../../../../src/Services/Shared/Domain/ValueObject/Youtube';
import { SharedMother } from '../../../../Shared/SharedMother';
import VideoMother from '../../VideoMother';

describe('Video model', () => {
    it('should create statically to create new video, created at will be generated', () => {
        const sut: Video = VideoMother.VideoToCreate();

        expect(sut.title).toBeInstanceOf(Title);
        expect(sut.title.value).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.tags).toBeInstanceOf(CommaTags);
        expect(sut.tags.value).toStrictEqual(SharedMother.COMMA_TAGS_VALUE);

        expect(sut.url).toBeInstanceOf(Youtube);
        expect(sut.url.value).toStrictEqual(SharedMother.Youtube().value);

        expect(sut.poster).toBeInstanceOf(Poster);
        expect(sut.poster.value).toStrictEqual(SharedMother.Poster().value);

        expect(sut.playlist).toBeInstanceOf(PlaylistId);
        expect(sut.playlist?.value).toStrictEqual(
            VideoMother.PlaylistId().value
        );

        expect(sut.playlistTitle).toBeInstanceOf(Title);
        expect(sut.playlistTitle?.value).toStrictEqual(
            VideoMother.PlaylistTitle().value
        );

        expect(sut.description).toBeInstanceOf(Description);
        expect(sut.description.value).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.createdAt).toBeInstanceOf(Date);
        expect(sut.id).toBeInstanceOf(Id);

        expect(sut.id.value).toStrictEqual(SharedMother.VALID_ID);
    });

    it('should create statically to read existing video, created at its required', () => {
        const sut: Video = VideoMother.VideoToRead();
        expect(sut.title).toBeInstanceOf(Title);
        expect(sut.title.value).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.tags).toBeInstanceOf(CommaTags);
        expect(sut.tags.value).toStrictEqual(SharedMother.COMMA_TAGS_VALUE);

        expect(sut.url).toBeInstanceOf(Youtube);
        expect(sut.url.value).toStrictEqual(SharedMother.Youtube().value);

        expect(sut.poster).toBeInstanceOf(Poster);
        expect(sut.poster.value).toStrictEqual(SharedMother.VALID_POSTER);

        expect(sut.description).toBeInstanceOf(Description);
        expect(sut.description.value).toStrictEqual(SharedMother.BASE64_TEXT);

        expect(sut.createdAt).toStrictEqual(VideoMother.VIDEO_CREATED_AT);
        expect(sut.id.value).toStrictEqual(SharedMother.VALID_ID);
    });
});
