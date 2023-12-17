import VideoType from '../../../Services/Content/Video/Domain/Model/VideoType';
import Base64Danko from '../../../Services/Shared/Infraestructure/Base64ToolDanko';
import { instance, key } from './base.api';
import { videos } from './videos';

const playlists = videos
    .getPlaylistIds('UCke07ha3WRqu_6-e3ToIfVQ', key)
    .then((data) => {
        return data;
    });

playlists.then((playlist) => {
    playlist.forEach(async(item) => {
        await videos.getPlaylist(item, key).then((videos) => {
            videos.forEach(async(video) => {
                createVideo(video);
            });
        });
    });
});
const createVideo = async(video: VideoType) => {
    const poster: string = await Base64Danko.fromImageUrlToBase64ToString(
        video.poster
    );
    const payload = {
        title: await Base64Danko.fromStringToBase64(video.title),
        description: await Base64Danko.fromStringToBase64(video.description),
        tags: video.tags,
        url: video.url,
        poster,
        playlist: video.playlist,
        playlistTitle: await Base64Danko.fromStringToBase64(video.playlistTitle as string),
        position: video.position,
    };

    await instance
        .post(`http://localhost:3000/api/v1/videos`, payload)
        .then((response) => console.log(response.data));
};
