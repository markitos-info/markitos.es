import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { videos } from "../../api/videos";
import MinHeightTextarea from "../../components/MinHeightTextarea";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import { VideoType } from "../../types/VideoType";

const VideoPage: React.FC = () => {
  const { id, playlistId } = useParams();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [video, setVideo] = React.useState<VideoType | null>(null);
  const [videosIds, setVideosIds] = React.useState<string[] | []>([]);
  const [page, setPage] = React.useState(1);
  const [videoId, setVideoId] = React.useState(id);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();

    setPage(value);
    setVideoId(videosIds[value - 1]);
  };

  React.useEffect(() => {
    async function fetchData() {
      const ids = await videos.getPlaylistVideosIds(playlistId as string);
      const response = await videos.getById({ id: videoId as string });
      setVideo(response !== null && response);
      setVideosIds(ids);
      setPage(ids.findIndex((id) => id === videoId) + 1);
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <Box sx={{ width: "100%", mb: 5, mt: 2 }} textAlign="center">
      <Container maxWidth="xl">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid sx={{ mt: 2 }} container columnSpacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ mb: 2 }} variant="body1" component="p">
                  {video!.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <YoutubeEmbed title={video!.title} embedId={`${video?.url}`} />
                <Box
                  sx={{
                    display: "block",
                    width: "100%",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  {video?.tags_list.map((tag: string) => (
                    <Chip
                      component={Button}
                      sx={{ mr: 1.5, mb: 1, cursor: "pointer" }}
                      label={tag}
                      variant="outlined"
                      key={`${video.id}-${tag}`}
                      color="primary"
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
                  <Pagination
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    size="large"
                    variant="outlined"
                    color="primary"
                    count={videosIds.length}
                    page={page}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }} container columnSpacing={2}>
              <Grid item xs={12}>
                <MinHeightTextarea text={video?.description as string} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default VideoPage;
