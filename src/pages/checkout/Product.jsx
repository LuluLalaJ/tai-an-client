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
import LessonCredit100 from "../../assets/LessonCredit100.jpeg"
import LessonCredit200 from "../../assets/LessonCredit200.jpg";
import LessonCredit300 from "../../assets/LessonCredit300.jpeg";
import { useSelector } from "react-redux";

import axios from "axios";

const tiers = [
  {
    title: "Discover",
    price: "100",
    buttonVariant: "outlined",
    image: `${LessonCredit100}`,
    pi: "price_1NLQNbFn2n3otckJ2XBj0Hzy",
  },
  {
    title: "Explore",
    subheader: "Most popular",
    price: "200",
    buttonVariant: "contained",
    image: `${LessonCredit200}`,
    pi: "price_1NLQNMFn2n3otckJVey4UEcX",
  },
  {
    title: "Master",
    price: "300",
    buttonVariant: "outlined",
    image: `${LessonCredit300}`,
    pi: "price_1NLQN6Fn2n3otckJUiaIh59j",
  },
];

export default function Product() {
  const {user} = useSelector(store => store.user )
  const id = user.id

   useEffect(() => {
     async function fetchConfig() {
       await fetch("/config").then((r) =>
         r.json()
       );
     }
     fetchConfig();
   }, []);


  const purchaseCredits = (e, pi) => {
    e.preventDefault()
    // axios
    //   .post("/create-checkout-session", {
    //     quantity: 1,
    //   })

    const postRequestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: pi,
        quantity: 1,
        metadata: {
          id: id
        }
      }),
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
                        purchaseCredits(e, tier.pi);
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
