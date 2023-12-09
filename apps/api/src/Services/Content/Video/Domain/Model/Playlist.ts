import ToPrimitiveTypeResult from '../../../../Shared/Domain/Action/DomainModel';
import Poster from '../../../../Shared/Domain/ValueObject/Poster';
import Title from '../../../../Shared/Domain/ValueObject/Title';
import PlaylistId from '../ValueObject/PlaylistId';
import PlaylistType from './PlaylistType';

class Playlist implements ToPrimitiveTypeResult {
    private constructor(
        public readonly id: PlaylistId,
        public readonly title: Title,
        public readonly poster: Poster,
        public readonly createdAt: Date
    ) {}

    public static create(
        id: PlaylistId,
        title: Title,
        poster: Poster,
        createdAt?: Date
    ): Playlist {
        let created: Date = new Date();
        if (createdAt !== undefined) {
            created = createdAt;
        }

        return new Playlist(id, title, poster, created);
    }

    public toPrimitives(): PlaylistType {
        return {
            id: this.id.value,
            title: this.title.value,
            poster: this.poster.value,
            createdAt: this.createdAt,
        };
    }
}

export default Playlist;
