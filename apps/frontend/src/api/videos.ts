import { ListType } from "../types/ListType.ts";
import { VideoType } from "../types/VideoType";
import {
  instance,
  instanceYoutubePlaylistsIds,
  tags,
  tags_list,
} from "./base.api.ts";

export const endpointVideos = "videos";
export const endpointPlaylist = "playlists";

export const videos = {
  getAll: async function () {
    const collection = await instance.get(endpointVideos, {
      params: {},
    });

    const result = collection.data === undefined ? [] : collection.data;

    return result;
  },
  getById: async function ({ id }: { id: string }) {
    const result = await instance.get(`${endpointVideos}/${id}`);

    return result.data.result;
  },
  getPlaylist: async function (id: string) {
    const response = await instance.get(`${endpointPlaylist}/${id}`);
    const allVideos: VideoType[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.data.result.forEach(async (item: any) => {
      allVideos.push({
        id: item.id,
        playlist: item.playlist,
        playlistTitle: item.playlistTitle,
        title: item.title,
        description: item.description,
        poster: item.poster,
        createdAt: item.publishedAt,
        tags: tags,
        tags_list: tags_list,
        url: item.url,
      });
    });

    return allVideos;
  },
  getPlaylistVideosIds: async function (id: string) {
    const response = await instance.get(`${endpointPlaylist}/${id}`);
    const allVideos: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.data.result.forEach(async (item: any) => {
      allVideos.push(item.id);
    });

    return allVideos;
  },
  getPlaylistsFromChannel: async function (channelId: string, key: string) {
    const playlists: ListType[] = [];
    const responseList = await instanceYoutubePlaylistsIds.get("/playlists", {
      params: {
        channelId: channelId,
        maxResults: 100,
        fields: "items",
        part: "snippet,contentDetails",
        key: key,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseList.data.items.forEach(async (item: any) => {
      const channel = item.snippet;
      const playlistId = item.id;
      playlists.push({
        id: playlistId,
        title: channel.localized.title,
        description: channel.localized.description,
        poster: channel.thumbnails.medium.url,
        count: item.contentDetails.itemCount,
      });
    });

    return playlists;
  },

  encode: async function (text: string) {
    return btoa(
      encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_match, p1) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return String.fromCharCode(("0x" + p1) as any);
      }),
    );
  },
};
