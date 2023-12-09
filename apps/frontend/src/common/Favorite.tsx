import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { HorizontalCardComponent } from "../components/HorizontalCard";
import { useAppSelector } from "../redux/hooks";

interface FavoriteComponentProps {
  open: boolean;
  handleStateViewDrawer: (state: boolean) => void;
}

export const FavoriteComponent: React.FC<FavoriteComponentProps> = ({
  open,
  handleStateViewDrawer,
}) => {
  const items = useAppSelector((state) => state.favoriteReducer);
  return (
    <>
      <Drawer anchor={"right"} open={open}>
        <Box sx={{ width: "25em", p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">favoritos</Typography>
            <IconButton
              color="primary"
              onClick={() => handleStateViewDrawer(false)}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          {items.length > 0
            ? items.map(({ id, poster, title, url }) => (
                <HorizontalCardComponent
                  key={id}
                  id={id}
                  poster={poster}
                  title={title}
                  url={url}
                />
              ))
            : "Nada por aqui"}
        </Box>
      </Drawer>
    </>
  );
};
