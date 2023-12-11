import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { videos } from "../../api/videos";
import VideoCardComponent from "../../components/VideoCard.tsx";
import { VideoType } from "../../types/VideoType";
import HeaderComponent from "../../components/Header.tsx";

const PlaylistPage: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [playVideos, setPlayVideos] = React.useState<VideoType[] | []>([]);
  const location = useLocation();

  React.useEffect(() => {
    setLoading(true);
    videos.getPlaylist(id as string).then(
      (r) => {
        setTimeout(() => setLoading(false), 1000);
        setPlayVideos(r);
      },
      (err) => {
        console.error(err);
      }
    );
  }, [id]);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            {playVideos!.length !== 0 ? (
              <>
                <HeaderComponent
                  title=""
                  description={location.state.playlistTitle}
                />
                <Grid sx={{ my: 2 }} container spacing={2} direction="row">
                  {playVideos!.map((video) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={`${crypto.randomUUID()}`}
                    >
                      <VideoCardComponent
                        video={video}
                        ids={playVideos.map((a) => a.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Alert severity="error" variant="outlined">
                  <Typography
                    sx={{ mt: 1, mb: 1 }}
                    variant="body1"
                    textAlign={"center"}
                  >
                    Ups! parece que no hay datos
                  </Typography>
                </Alert>
              </Box>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default PlaylistPage;
