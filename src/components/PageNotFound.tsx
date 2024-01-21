import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const PageNotFound = () => {
  return (
    <Container>
      <Typography variant="h1">404 - Page Not Found</Typography>
      <Typography variant="body1">
        Oops! The page you are looking for might be in another galaxy.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default PageNotFound;
