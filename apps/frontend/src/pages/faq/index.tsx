import { Button, Container } from "@mui/material";
import React from "react";

const FaqPage: React.FC = () => {
  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Button fullWidth variant="contained">
        Estamos en faq
      </Button>
    </Container>
  );
};

export default FaqPage;
