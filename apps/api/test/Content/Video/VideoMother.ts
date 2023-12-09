import { v4 as uuidv4 } from 'uuid';

import VideoCreateRequest from '../../../src/Services/Content/Video/Application/Create/VideoCreateRequest';
import VideoCreateResponse from '../../../src/Services/Content/Video/Application/Create/VideoCreateResponse';
import VideoCreateService from '../../../src/Services/Content/Video/Application/Create/VideoCreateService';
import VideoDeleteRequest from '../../../src/Services/Content/Video/Application/Delete/VideoDeleteRequest';
import VideoDeleteService from '../../../src/Services/Content/Video/Application/Delete/VideoDeleteService';
import VideoGetRequest from '../../../src/Services/Content/Video/Application/Get/VideoGetRequest';
import VideoGetService from '../../../src/Services/Content/Video/Application/Get/VideoGetService';
import VideoListRequest from '../../../src/Services/Content/Video/Application/List/VideoListRequest';
import VideoListResponse from '../../../src/Services/Content/Video/Application/List/VideoListResponse';
import VideoListService from '../../../src/Services/Content/Video/Application/List/VideoListService';
import VideoPlaylistRequest from '../../../src/Services/Content/Video/Application/Playlist/VideoPlaylistRequest';
import VideoPlaylistResponse from '../../../src/Services/Content/Video/Application/Playlist/VideoPlaylistResponse';
import VideoPlaylistService from '../../../src/Services/Content/Video/Application/Playlist/VideoPlaylistService';
import Playlist from '../../../src/Services/Content/Video/Domain/Model/Playlist';
import Video from '../../../src/Services/Content/Video/Domain/Model/Video';
import VideoRepository from '../../../src/Services/Content/Video/Domain/Persistence/VideoRepository';
import PlaylistId from '../../../src/Services/Content/Video/Domain/ValueObject/PlaylistId';
import Base64ImageWriter from '../../../src/Services/Shared/Domain/Lib/Base64ImageWriter';
import { SharedMother } from '../../Shared/SharedMother';

class VideoMother {
    public static VIDEO_TITLE: string = 'a'.repeat(100);
    public static VIDEO_CREATED_AT: Date = new Date();
    public static VIDEO_ID: string = uuidv4();
    public static VIDEO_PLAYLIST_ID: string =
        'PL-1zlyAOA1_6MTN_mi_o8Bkp71bmBOTYh';
    public static VIDEO_ID_2: string = uuidv4();
    public static VIDEO_ID_3: string = uuidv4();
    public static VIDEO_PATTERN: string = 'aaa';

    public static PlaylistId(value?: string): PlaylistId {
        return new PlaylistId(
            value !== undefined ? value : VideoMother.VIDEO_PLAYLIST_ID
        );
    }
    public static Playlist(): Playlist {
        return Playlist.create(
            VideoMother.PlaylistId(),
            SharedMother.Title(),
            SharedMother.Poster()
        );
    }

    public static VideoDeleteService(
        repository: VideoRepository
    ): VideoDeleteService {
        return new VideoDeleteService(repository);
    }

    public static VideoGetService(
        repository: VideoRepository
    ): VideoGetService {
        return new VideoGetService(repository);
    }

    public static VideoCreateService(
        repository: VideoRepository,
        imagener: Base64ImageWriter
    ): VideoCreateService {
        return new VideoCreateService(repository, imagener);
    }

    public static VideoGetRequest(): VideoGetRequest {
        return new VideoGetRequest(SharedMother.VALID_ID);
    }
    public static VideoPlaylistRequest(): VideoPlaylistRequest {
        return new VideoPlaylistRequest(VideoMother.VIDEO_PLAYLIST_ID);
    }

    public static VideoDeleteRequest(): VideoDeleteRequest {
        return new VideoDeleteRequest(SharedMother.VALID_ID);
    }

    public static VideoCreateResponse(): VideoCreateResponse {
        return new VideoCreateResponse(
            SharedMother.VALID_ID,
            SharedMother.VALID_POSTER
        );
    }

    public static VideoListService(
        repository: VideoRepository
    ): VideoListService {
        return new VideoListService(repository);
    }
    public static VideoPlaylistService(
        repository: VideoRepository
    ): VideoPlaylistService {
        return new VideoPlaylistService(repository);
    }

    public static VideoListRequest(): VideoListRequest {
        return new VideoListRequest(VideoMother.VIDEO_PATTERN);
    }

    public static VideoListResponse(): VideoListResponse {
        return new VideoListResponse([VideoMother.VideoToRead()]);
    }
    public static VideoPlaylistResponse(): VideoPlaylistResponse {
        return new VideoPlaylistResponse([VideoMother.VideoToRead()]);
    }

    public static VideoCreateRequest(
        id?: string,
        title?: string,
        tags?: string,
        url?: string,
        poster?: string,
        playlist?: string | undefined,
        position?: number | undefined
    ): VideoCreateRequest {
        return new VideoCreateRequest(
            id !== undefined ? id : SharedMother.Id().value,
            title !== undefined ? title : SharedMother.BASE64_TEXT,
            SharedMother.BASE64_TEXT,
            tags !== undefined ? tags : SharedMother.CommaTags().value,
            url !== undefined ? url : SharedMother.Youtube().value,
            poster !== undefined ? poster : SharedMother.BASE64_PNG_IMAGE,
            playlist !== undefined ? playlist : VideoMother.PlaylistId().value,
            position !== undefined ? position : 0
        );
    }

    public static VideoToCreate(): Video {
        return Video.create(
            SharedMother.Id(),
            SharedMother.Title(),
            SharedMother.Description(),
            SharedMother.CommaTags(),
            SharedMother.Youtube(),
            SharedMother.Poster(),
            new Date(),
            VideoMother.PlaylistId()
        );
    }

    public static VideoToRead(
        id?: string,
        title?: string,
        description?: string,
        tags?: string,
        url?: string,
        poster?: string,
        position?: number | undefined
    ): Video {
        return Video.create(
            SharedMother.Id(id),
            SharedMother.Title(title),
            SharedMother.Description(description),
            SharedMother.CommaTags(tags),
            SharedMother.Youtube(url),
            SharedMother.Poster(
                poster === undefined ? SharedMother.VALID_POSTER : poster
            ),
            VideoMother.VIDEO_CREATED_AT,
            VideoMother.PlaylistId(),
            position
        );
    }
}

export default VideoMother;
