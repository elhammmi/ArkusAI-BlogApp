import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ErrorPage = () => {
  return (
    <Container>
      <Typography variant="h1">Error</Typography>
      <Typography variant="body1">Something went wrong!</Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
