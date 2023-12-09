import VideoDeleteRequest from '../../../../../src/Services/Content/Video/Application/Delete/VideoDeleteRequest';
import { SharedMother } from '../../../../Shared/SharedMother';
import VideoMother from '../../VideoMother';

describe('VideoDeleteRequest', () => {
    it('shoud create with an id', () => {
        const sut: VideoDeleteRequest = VideoMother.VideoDeleteRequest();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
    });
});
