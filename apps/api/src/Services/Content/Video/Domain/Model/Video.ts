import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import CommaTags from '../../../../Shared/Domain/ValueObject/CommaTags';
import Description from '../../../../Shared/Domain/ValueObject/Description';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Poster from '../../../../Shared/Domain/ValueObject/Poster';
import Title from '../../../../Shared/Domain/ValueObject/Title';
import Youtube from '../../../../Shared/Domain/ValueObject/Youtube';
import PlaylistId from '../ValueObject/PlaylistId';
import VideoType from './VideoType';

class Video implements ToPrimitiveTypeResult {
    private constructor(
        public readonly id: Id,
        public readonly title: Title,
        public description: Description,
        public readonly tags: CommaTags,
        public readonly url: Youtube,
        public readonly poster: Poster,
        public readonly createdAt: Date,
        public readonly playlist?: PlaylistId | undefined,
        public readonly playlistTitle?: Title | undefined,
        public readonly position?: number | undefined
    ) {}

    public static create(
        id: Id,
        title: Title,
        description: Description,
        tags: CommaTags,
        url: Youtube,
        poster: Poster,
        createdAt?: Date,
        playlist?: PlaylistId | undefined,
        playlistTitle?: Title | undefined,
        position?: number | undefined
    ): Video {
        let created: Date = new Date();
        if (createdAt !== undefined) {
            created = createdAt;
        }

        return new Video(
            id,
            title,
            description,
            tags,
            url,
            poster,
            created,
            playlist,
            playlistTitle,
            position
        );
    }

    public toPrimitives(): VideoType {
        return {
            id: this.id.value,
            title: this.title.value,
            description: this.description.value,
            tags: this.tags.value,
            tags_list: this.tags.toArray(),
            url: this.url.value,
            poster: this.poster.value,
            createdAt: this.createdAt,
            playlist: this.playlist?.value,
            playlistTitle: this.playlistTitle?.value,
            position: this.position,
        };
    }
}

export default Video;
