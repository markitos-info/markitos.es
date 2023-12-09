import axios from 'axios';

export const BASE_URL: string = 'http://markitos.api:3000/api/v1';
export const key = 'AIzaSyAhLpY7NN4NXVyEmvQ9p6NV64_wr2Q5Rj8';
export const tags =
    'aws,devop,azure,typescript,cloud,kubernetes,docker,ansible,golang,go';
export const tags_list = tags.split(',');

export const instance = axios.create({
    baseURL: BASE_URL,
});

export const instanceYoutubePlaylistsIds = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        key: key,
        fields: 'items.snippet,items.id',
    },
});

export const instanceYoutubePlaylist = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        key: key,
        fields: 'items.snippet,items.id,items.snippet.localized',
    },
});

export const instanceYoutubePlaylistVideos = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        key: key,
        fields: 'items',
    },
});
