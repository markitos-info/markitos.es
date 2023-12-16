import { FavoriteOutlined, HeartBroken } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { setItem } from "../helpers/localStorage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addToFavorite,
  removeToFavorite,
} from "../redux/slices/favorite.slice";
import { VideoType } from "../types/VideoType";
import { useNavigate } from "react-router-dom";

type CardProps = {
  video: VideoType;
  ids: string[];
};

const VideoCardComponent: React.FC<CardProps> = (prosp: CardProps) => {
  const [added, setAdded] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const itemExist = useAppSelector((state) => state.favoriteReducer);
  React.useEffect(() => {
    setAdded(itemExist.some((item) => item.id === prosp.video.id));
    setItem("favorite", itemExist);
  }, [itemExist, prosp.video.id]);

  const handleAddToFavorite = () => {
    if (added) {
      dispatch(removeToFavorite(prosp.video));
      return;
    }

    dispatch(
      addToFavorite({
        id: prosp.video.id,
        title: prosp.video.title,
        poster: prosp.video.poster,
        url: `/playlists/${prosp.video.playlist}/videos/${prosp.video.id}`,
      })
    );
  };

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea
        onClick={() =>
          navigate(
            `/playlists/${prosp.video.playlist}/videos/${prosp.video.id}`
          )
        }
      >
        <CardMedia
          component="img"
          height="194"
          src={prosp.video.poster}
          alt="{title}"
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="button" sx={{ mb: 1.5 }}>
            {prosp.video.title}
          </Typography>
          <Divider />
        </CardContent>
      </CardActionArea>
      <CardActions
        disableSpacing
        sx={{
          alignSelf: "stretch",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          p: 1,
          mb: 1,
          mr: 1,
          mt: -1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{ width: "100px" }}
          onClick={() =>
            navigate(
              `/playlists/${prosp.video.playlist}/videos/${prosp.video.id}`
            )
          }
        >
          ver
        </Button>
        <Button
          sx={{ ml: 1 }}
          variant={added ? "contained" : "outlined"}
          size="small"
          color={added ? "success" : "error"}
          onClick={(event) => {
            event.preventDefault();
            handleAddToFavorite();
          }}
        >
          {added ? <FavoriteOutlined /> : <HeartBroken />}
        </Button>
      </CardActions>
    </Card>
  );
};

export default VideoCardComponent;
