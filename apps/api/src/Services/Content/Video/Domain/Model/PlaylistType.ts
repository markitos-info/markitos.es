import PrimitiveType from '../../../../Shared/Domain/Action/PrimitiveType';

interface PlaylistType extends PrimitiveType {
    id: string;
    title: string;
    poster: string;
    createdAt: Date;
}

export default PlaylistType;
