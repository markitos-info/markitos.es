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
import { useNavigate } from "react-router-dom";
import { endpointPlaylist } from "../api/videos";

type CardProps = {
  id: string;
  poster: string;
  title: string;
  tags: string;
  count: number;
};

const PlaylistCardComponent: React.FC<CardProps> = ({
  id,
  poster,
  title,
  tags,
  count,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={() =>
        navigate(`${endpointPlaylist}/${id}`, {
          state: {
            playlistTitle: title,
          },
        })
      }
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="194"
          src={poster}
          alt={title}
          prefix={`total ${count}`}
          title={`total ${count}`}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          slac
          <Typography variant="button" sx={{ mb: 1.5 }}>
            {title}
          </Typography>
          <Divider />
          <Typography variant="subtitle2" color="secondary" sx={{ mt: 1.5 }}>
            {tags}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          sx={{ mr: 1 }}
          fullWidth
          variant="contained"
          onClick={() =>
            navigate(`${endpointPlaylist}/${id}`, {
              state: {
                playlistTitle: title,
              },
            })
          }
        >
          ver
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardComponent;
