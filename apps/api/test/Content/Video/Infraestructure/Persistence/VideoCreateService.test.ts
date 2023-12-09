import VideoCreateRequest from '../../../../../src/Services/Content/Video/Application/Create/VideoCreateRequest';
import VideoCreateService from '../../../../../src/Services/Content/Video/Application/Create/VideoCreateService';
import Video from '../../../../../src/Services/Content/Video/Domain/Model/Video';
import VideoRepository from '../../../../../src/Services/Content/Video/Domain/Persistence/VideoRepository';
import VideoRepositoryMariaDB from '../../../../../src/Services/Content/Video/Infraestructure/Persistence/VideoRepositoryMariaDB';
import NotFoundException from '../../../../../src/Services/Shared/Domain/Exception/NotFoundException';
import Id from '../../../../../src/Services/Shared/Domain/ValueObject/Id';
import { SharedMother } from '../../../../Shared/SharedMother';
import Base64ImageWriterForTest from '../../Application/Base64ImageWriterForTest';
import VideoMother from '../../VideoMother';

const imagener: Base64ImageWriterForTest = new Base64ImageWriterForTest();
const videos: VideoRepository = new VideoRepositoryMariaDB();
const creator: VideoCreateService = VideoMother.VideoCreateService(
    videos,
    imagener
);
const createRequest: VideoCreateRequest = VideoMother.VideoCreateRequest();

describe('VideoCreateService', () => {
    it('shoud create a video', () => {
        expect(async() => {
            await creator.execute(createRequest);

            await videos.delete(new Id(createRequest.id));
        }).not.toThrow();
    });

    it('shoud get an existing video', () => {
        expect(async() => {
            await creator.execute(createRequest);

            const video: Video = await videos.get(new Id(createRequest.id));

            expect(SharedMother.VALID_ID).toStrictEqual(video.id.value);

            await videos.delete(new Id(createRequest.id));
        });
    });

    it('shoud delete an existing video', () => {
        async() => {
            await creator.execute(createRequest);
            await videos.delete(new Id(createRequest.id));

            try {
                await videos.get(new Id(createRequest.id));
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        };
    });

    it('shoud list videos without pattern', () => {
        expect(async() => {
            await creator.execute(createRequest);
            await creator.execute(
                VideoMother.VideoCreateRequest(SharedMother.VALID_ID_2)
            );

            const collection: Video[] = await videos.list();

            expect(collection.length).toBeGreaterThanOrEqual(2);
            expect(SharedMother.VALID_ID).toStrictEqual(collection[0].id.value);
            expect(SharedMother.VALID_ID_2).toStrictEqual(
                collection[1].id.value
            );

            await videos.delete(new Id(createRequest.id));
            await videos.delete(new Id(SharedMother.VALID_ID_2));
        });
    });

    it('shoud list videos with a pattern (search in title and description)', () => {
        const prefixToSearch: string =
            Date.now().toString(36) + Math.random().toString(36).substring(2);

        expect(async() => {
            await creator.execute(
                VideoMother.VideoCreateRequest(SharedMother.VALID_ID)
            );
            await creator.execute(
                VideoMother.VideoCreateRequest(
                    SharedMother.VALID_ID_2,
                    prefixToSearch + ' title 1'
                )
            );
            await creator.execute(
                VideoMother.VideoCreateRequest(
                    SharedMother.VALID_ID_3,
                    prefixToSearch + ' title 2'
                )
            );

            const collection: Video[] = await videos.list(prefixToSearch);

            expect(collection.length).toBeGreaterThanOrEqual(2);
            expect(SharedMother.VALID_ID).toStrictEqual(collection[0].id.value);
            expect(SharedMother.VALID_ID_2).toStrictEqual(
                collection[1].id.value
            );

            await videos.delete(new Id(createRequest.id));
            await videos.delete(new Id(SharedMother.VALID_ID_2));
        });
    });
});
