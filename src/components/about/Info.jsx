import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "primary.main",
  fontWeight: "medium",
};

function Info() {
  return (
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 10 }}>
          About
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={number}>Hours</Box>
              <Box>
                <QueryBuilderIcon sx={{ my: 4 }} />
              </Box>
              <Typography variant="h5" align="center">
                Weekdays: 9 am to 6 pm
              </Typography>
              <Typography variant="h5" align="center">
                Saturday: 9 am to 8 pm
              </Typography>
              <Typography variant="h5" align="center">
                Sunday: 11 am to 5 pm
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={number}>Location</Box>
              <Box>
                <LocationOnIcon sx={{ my: 4 }} />
              </Box>
              <Typography variant="h5" align="center">
                153 E 69th Street
              </Typography>
              <Typography variant="h5" align="center">
                New York
              </Typography>
              <Typography variant="h5" align="center">
                NY
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={number}>Subway</Box>
              <Box>
                <DirectionsSubwayIcon sx={{ my: 4 }} />
              </Box>
              <Typography variant="h5" align="center">
                68th Street (6)
              </Typography>
              <Typography variant="h5" align="center">
                72nd Street (N/Q)
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Button
          size="large"
          variant="contained"
          component="a"
          href="/signup"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
  );
}

export default Info;
