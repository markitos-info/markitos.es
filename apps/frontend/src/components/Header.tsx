import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

type HeaderProps = {
  title: string;
  description: string;
  element?: React.ReactNode | null;
};

const HeaderComponent: React.FC<HeaderProps> = ({
  title,
  description,
  element,
}) => {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          maxHeight: "100px",
          minHeight: "70px",
          height: "70px",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="left"
          sx={{ height: "100%" }}
        >
          <Grid item xs={5}>
            <Grid
              container
              direction="column"
              justifyContent="left"
              sx={{ height: "100%", p: 2 }}
            >
              <Grid item textAlign={"left"}>
                <Stack direction={"row"} spacing={2}>
                  <Typography sx={{ mb: 2 }} variant="body1" component="p">
                    {title}
                  </Typography>
                  <Typography
                    variant="h6"
                    noWrap
                    textAlign={"left"}
                    color={"secondary"}
                  >
                    {description}
                  </Typography>
                </Stack>
              </Grid>
              {element !== undefined && (
                <Grid sx={{ mt: 4, width: "100%" }} item>
                  {element}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </div>
  );
};

export default HeaderComponent;
