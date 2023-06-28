import * as React from "react";
import { Grid, Container, Typography}from "@mui/material";

  const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={4} >
          <Typography variant="h1" sx={{ pt: 30 }}>
            Tai-an
          </Typography>
          <Typography variant="h2" sx={{ pt: 5 }}>
            Tea School
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
