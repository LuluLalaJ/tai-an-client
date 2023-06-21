import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { CardMedia } from "@mui/material";
import axios from "axios";


const tiers = [
  {
    title: "Discover",
    price: "100",
    buttonVariant: "outlined",
    image: "https://rb.gy/ltfqb",
  },
  {
    title: "Explore",
    subheader: "Most popular",
    price: "200",
    buttonVariant: "contained",
    image: "https://rb.gy/n0lc1",
  },
  {
    title: "Master",
    price: "300",
    buttonVariant: "outlined",
    image: "https://rb.gy/7yv2r",
  },
];

export default function Product() {
   useEffect(() => {
     async function fetchConfig() {
       // Fetch config from our backend.
       const { unitAmount, currency } = await fetch("/config").then((r) =>
         r.json()
       );
      //  setAmount(unitAmount);
      //  setCurrency(currency);
     }
     fetchConfig();
   }, []);


  const purchaseCredits = (e) => {
    e.preventDefault()
    // axios
    //   .post("/create-checkout-session", {
    //     quantity: 1,
    //   })

// window.location.href = data.url;

    const postRequestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: 1
      })
    };
    fetch("/create-checkout-session", postRequestObj)
      .then((r) => r.json())
      .then((data) => (window.location.href = data.url));
  }

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Purchase Credits
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ex
          minus molestias velit dignissimos officiis libero itaque repudiandae
          doloribus fugit?
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                  </Box>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={tier.image}
                    // title="green iguana"
                  />
                </CardContent>
                <CardActions>
                    <Button
                      type="submit"
                      onClick={(e) => {
                        console.log("submitted");
                        purchaseCredits(e);
                      }
                        }
                      fullWidth
                      variant={tier.buttonVariant}
                    >
                      Check Out
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
