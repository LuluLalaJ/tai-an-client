import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

  const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ height: "100vh" }}>
        <Grid item md={4}>
          <Typography variant="h2" sx={{ pt: 30 }}>
            Welcome
          </Typography>
        </Grid>
        <Grid
          item
          md={8}
          sx={{
            backgroundImage: `url(https://shorturl.at/krIO8)`,
            backgroundRepeat: "no-repeat",
          }}
        ></Grid>
      </Grid>
    </Container>
  );
};

export default Home;
