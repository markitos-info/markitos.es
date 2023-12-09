import type VideoCreateRequest from '../../../../../src/Services/Content/Video/Application/Create/VideoCreateRequest';
import VideoCreateService from '../../../../../src/Services/Content/Video/Application/Create/VideoCreateService';
import VideoCreateReadModel from '../../../../../src/Services/Content/Video/Domain/Model/VideoCreateReadModel';
import BadRequestException from '../../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import { SharedMother } from '../../../../Shared/SharedMother';
import VideoMother from '../../VideoMother';
import Base64ImageWriterForTest from '../Base64ImageWriterForTest';
import VideoRepositoryForTest from '../VideoRepositoryForTest';

const respository: VideoRepositoryForTest = new VideoRepositoryForTest();
const imagener: Base64ImageWriterForTest = new Base64ImageWriterForTest();

const request: VideoCreateRequest = VideoMother.VideoCreateRequest();

const sut: VideoCreateService = VideoMother.VideoCreateService(
    respository,
    imagener
);

describe('VideoCreateService', () => {
    it('shoud create a video', async() => {
        await sut.execute(request);

        expect(respository.createdCalled).toBeTruthy();
    });

    it('shoud result a response with create video id', async() => {
        const result: VideoCreateReadModel = await sut.execute(
            VideoMother.VideoCreateRequest()
        );
        expect(result.id).toStrictEqual(SharedMother.VALID_ID);
    });

    it('should throw a bad request on invalid id', async() => {
        try {
            await sut.execute(VideoMother.VideoCreateRequest('non-valid-id'));
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });
});
