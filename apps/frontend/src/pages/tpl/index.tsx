import React from "react";
import { Button, Container } from "@mui/material";

const TPLPage: React.FC<object> = () => {
  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Button fullWidth variant="contained">
        Estamos en home
      </Button>
    </Container>
  );
};

export default TPLPage;
