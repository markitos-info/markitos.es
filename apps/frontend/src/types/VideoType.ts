export interface VideoType {
  id: string;
  playlist: string | undefined;
  playlistTitle: string | undefined;
  title: string;
  description: string;
  tags: string;
  tags_list: string[];
  poster: string;
  url: string;
  createdAt: Date;
}
