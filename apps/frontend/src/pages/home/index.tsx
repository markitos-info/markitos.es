import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { key } from "../../api/base.api.ts";
import { videos } from "../../api/videos";
import HeaderComponent from "../../components/Header";
import PlaylistCardComponent from "../../components/PlaylistCard";
import { ListType } from "../../types/ListType";

export const HomePage: React.FC<object> = () => {
  const [allChannels, setAllChannels] = React.useState<ListType[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const list = async () => {
    const collection: ListType[] = await videos.getPlaylistsFromChannel(
      "UCke07ha3WRqu_6-e3ToIfVQ",
      key
    );

    const lists: ListType[] = [];
    collection.forEach((item) => {
      lists.push({
        id: item.id,
        title: item.title,
        description: item.description,
        poster: item.poster,
        count: item.count,
      });
    });

    return lists;
  };

  React.useEffect(() => {
    setLoading(true);
    list()
      .then((r) => {
        setAllChannels(r);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <HeaderComponent title="" description="videos" />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            {allChannels!.length !== 0 ? (
              <Grid sx={{ my: 2 }} container spacing={2} direction="row">
                {allChannels!.map((playlist) => (
                  <Grid item xs={12} sm={6} xl={3} md={4} key={playlist.id}>
                    <PlaylistCardComponent
                      id={playlist.id}
                      poster={playlist.poster}
                      title={playlist.title}
                      tags={playlist.description.slice(0, 100) + "..."}
                      count={playlist.count}
                    />
                  </Grid>
                ))}
              </Grid>
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
