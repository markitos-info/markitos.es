import axios from "axios";

export const BASE_URL_DEVELOPMENT: string = "http://localhost:3000/api/v1";
export const BASE_URL_PRODUCTION: string =
  "http://culturadevop.com:3000/api/v1";
export const BASE_URL: string = BASE_URL_DEVELOPMENT;

export const key = "AIzaSyAhLpY7NN4NXVyEmvQ9p6NV64_wr2Q5Rj8";
export const tags =
  "aws,devop,practitioner,azure,sistemas,certificacion aws,certificacion azure,typescript,linux,az900,clf01,cloud,kubernetes,docker,ansible,golang,go";
export const tags_list = tags.split(",");

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const instanceYoutubePlaylistsIds = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: key,
    fields: "items.snippet,items.id",
  },
});

export const login = async (email: string, password: string) => {
  const payload = {
    email,
    password,
  };

  const response = await instance.post("/login", payload);

  return response.data;
};
