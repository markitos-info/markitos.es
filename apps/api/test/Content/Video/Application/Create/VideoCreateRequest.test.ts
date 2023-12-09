import VideoCreateRequest from '../../../../../src/Services/Content/Video/Application/Create/VideoCreateRequest';
import { SharedMother } from '../../../../Shared/SharedMother';
import VideoMother from '../../VideoMother';

describe('VideoCreateRequest', () => {
    it('shoud create with an id, title and description as string', () => {
        const sut: VideoCreateRequest = VideoMother.VideoCreateRequest();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
        expect(sut.title).toStrictEqual(SharedMother.BASE64_TEXT);
        expect(sut.tags).toStrictEqual(SharedMother.COMMA_TAGS_VALUE);

        expect(sut.url).toStrictEqual(SharedMother.Youtube().value);
        expect(sut.poster).toStrictEqual(SharedMother.BASE64_PNG_IMAGE);
        expect(sut.description).toStrictEqual(SharedMother.BASE64_TEXT);
    });
});
