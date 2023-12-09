import VideoGetRequest from '../../../../../src/Services/Content/Video/Application/Get/VideoGetRequest';
import { SharedMother } from '../../../../Shared/SharedMother';
import VideoMother from '../../VideoMother';

describe('VideoGetRequest', () => {
    it('shoud create with an id', () => {
        const sut: VideoGetRequest = VideoMother.VideoGetRequest();

        expect(sut.id).toStrictEqual(SharedMother.VALID_ID);
    });
});
