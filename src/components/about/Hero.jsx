import * as React from "react";
import { Button, Typography, Container } from "@mui/material";
// import Button from "../components/Button";
// import Typography from "../components/Typography";
// import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage = "https://shorturl.at/finot";

export default function Hero() {
  return (
    <Container
      sx={{
        py: 20,
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
      </Typography>
    </Container>
  );
}
