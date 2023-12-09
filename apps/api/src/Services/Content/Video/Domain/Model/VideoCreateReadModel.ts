import PrimitiveType from '../../../../Shared/Domain/Action/PrimitiveType';

interface VideoCreateReadModel extends PrimitiveType {
    id: string;
    poster: string;
}

export default VideoCreateReadModel;
