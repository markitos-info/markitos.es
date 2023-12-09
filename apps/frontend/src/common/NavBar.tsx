import { VideoLibraryTwoTone } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { FavoriteComponent } from "./Favorite";

const NavBar: React.FC<object> = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const items = useAppSelector((state) => state.favoriteReducer);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleStateViewDrawer = (state: boolean) => setOpen(state);

  return (
    <>
      <AppBar position="sticky" variant="elevation">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              alt="Cultura Devop"
              src="/logo.png"
              sx={{
                display: { xs: "none", md: "flex" },
                m: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Avatar
                alt="Cultura Devop"
                src="/logo.png"
                sx={{ display: { xs: "flex" }, m: 1, cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  setAnchorElNav(event.currentTarget)
                }
                color="primary"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={(): void => setAnchorElNav(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorElNav(null);
                    navigate("/");
                  }}
                >
                  <Typography
                    textAlign="center"
                    variant="caption"
                    color="primary"
                  >
                    Playlists
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorElNav(null);
                    navigate("/faqs");
                  }}
                >
                  <Typography
                    textAlign="center"
                    variant="caption"
                    color="primary"
                  >
                    Faqs
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="primary"
                rel="noopener noreferrer"
                onClick={() => {
                  setAnchorElNav(null);
                  navigate("/");
                }}
                sx={{ my: 2, display: "block" }}
              >
                Playlists
              </Button>
              <Button
                variant="text"
                color="primary"
                rel="noopener noreferrer"
                onClick={() => {
                  setAnchorElNav(null);
                  navigate("/faqs");
                }}
                sx={{ my: 2, display: "block" }}
              >
                Faqs
              </Button>
            </Box>
            <IconButton
              color="primary"
              onClick={() => handleStateViewDrawer(true)}
            >
              <Badge color="error" badgeContent={items.length}>
                <VideoLibraryTwoTone />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <FavoriteComponent
        open={open}
        handleStateViewDrawer={handleStateViewDrawer}
      />
    </>
  );
};

export default NavBar;
