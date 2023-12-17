import PrimitiveType from '../../../../Shared/Domain/Action/PrimitiveType';

interface VideoType extends PrimitiveType {
    id: string;
    title: string;
    description: string;
    tags: string;
    tags_list: string[];
    url: string;
    poster: string;
    createdAt: Date;
    playlist: string | undefined;
    playlistTitle: string | undefined;
    position: number | undefined;
}

export default VideoType;
