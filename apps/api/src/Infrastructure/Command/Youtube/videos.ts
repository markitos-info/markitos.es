import VideoType from '../../../Services/Content/Video/Domain/Model/VideoType';
import { VideoCommandListType } from './VideoCommandListType';
import {
    instance,
    instanceYoutubePlaylistVideos,
    instanceYoutubePlaylistsIds,
    tags,
    tags_list,
} from './base.api';

const endpoint = 'videos';
export const endpointPlaylist = 'playlists';

export const videos = {
    getAll: async function() {
        const collection = await instance.get(endpoint, {
            params: {},
        });

        const result = collection.data === undefined ? [] : collection.data;

        return result;
    },
    getById: async function({ id }: { id: string }) {
        const result = await instance.get(`${endpoint}/${id}`);

        result.data.result.description = decodeURI(
            result.data.result.description
        );

        return result.data.result;
    },
    getPlaylist: async function(playlist: VideoCommandListType, key: string) {
        const response = await instanceYoutubePlaylistVideos.get(
            `playlistItems?playlistId=${playlist.id}&order=position&part=snippet&maxResults=100&key=${key}`
        );

        const allVideos: VideoType[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.items.forEach(async(item: any) => {
            const url =
                item.snippet.thumbnails.medium !== undefined
                    ? item.snippet.thumbnails.medium.url
                    : '';
            allVideos.push({
                id: item.id,
                playlist: item.snippet.playlistId,
                playlistTitle: playlist.title,
                title: item.snippet.title,
                description: item.snippet.description,
                poster: url,
                createdAt: item.snippet.publishedAt,
                tags: tags,
                tags_list: tags_list,
                url:
                    'https://www.youtube.com/embed/' +
                    item.snippet.resourceId.videoId,
                position: item.snippet.position,
            });
        });

        return allVideos;
    },
    getPlaylistIds: async function(channelId: string, key: string) {
        const playlists: VideoCommandListType[] = [];
        const responseList = await instanceYoutubePlaylistsIds.get(
            '/playlists',
            {
                params: {
                    channelId: channelId,
                    maxResults: 100,
                    fields: 'items.snippet,items.id',
                    key: key,
                },
            }
        );

        responseList.data.items.forEach(async(item) => {
            const channel = item.snippet;
            const playlistId = item.id;
            playlists.push({
                id: playlistId,
                title: channel.localized.title,
                description: await this.encode(channel.localized.description),
                poster: channel.thumbnails.medium.url,
            });
        });

        return playlists;
    },

    encode: async function(text: string) {
        return btoa(
            encodeURIComponent(text).replace(
                /%([0-9A-F]{2})/g,
                (_match, p1) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return String.fromCharCode(('0x' + p1) as any);
                }
            )
        );
    },
};
