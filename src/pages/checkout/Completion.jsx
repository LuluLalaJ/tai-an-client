import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Completion = () => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  // useEffect(() => {
  //   async function fetchSession() {
  //     setSession(
  //       await fetch("/checkout-session?sessionId=" + sessionId).then((res) =>
  //         res.json()
  //       )
  //     );
  //   }
  //   fetchSession();
  // }, [sessionId]);

  return (
    <Container maxWidth="xl">
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          // mb: 4,
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
  )
};

export default Completion;
