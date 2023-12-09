import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { removeToFavorite } from "../../redux/slices/favorite.slice";

interface CardHorizntalComponentProps {
  id: string | number;
  poster: string;
  title: string;
  url: string;
}

export const HorizontalCardComponent: React.FC<CardHorizntalComponentProps> = ({
  id,
  poster,
  title,
  url,
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveToFavorite = () => {
    dispatch(removeToFavorite({ id }));
  };

  return (
    <Card sx={{ display: "flex", my: 1 }}>
      <Grid container sx={{ mx: 1 }} direction={"row"}>
        <Grid item xs={12}>
          <CardContent>
            <CardMedia
              component="img"
              sx={{ width: "100%", objectFit: "fill" }}
              image={poster}
              alt={title}
            />
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="subtitle2">{title}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardActions>
            <Button fullWidth variant="contained" size="small" href={url}>
              ver
            </Button>
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              size="small"
              color="warning"
              onClick={handleRemoveToFavorite}
            >
              quitar
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
