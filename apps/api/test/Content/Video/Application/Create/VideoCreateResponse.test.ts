import VideoCreateResponse from '../../../../../src/Services/Content/Video/Application/Create/VideoCreateResponse';
import { SharedMother } from '../../../../Shared/SharedMother';
import VideoMother from '../../VideoMother';

describe('VideoCreateResponse', () => {
    it('shoud create with an id', () => {
        const sut: VideoCreateResponse = VideoMother.VideoCreateResponse();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
    });
});
