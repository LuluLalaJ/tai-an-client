import { Box, Container, Paper, Typography, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Completion = () => {

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={8}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
              >
                Your Purchase Was Successful
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                component={RouterLink}
                to="/"
              >
                Go back to Home
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Completion;
