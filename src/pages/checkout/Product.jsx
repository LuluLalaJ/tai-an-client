import { useEffect } from "react";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from "@mui/material";
import LessonCredit100 from "../../assets/LessonCredit100.jpeg";
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
    pi: "price_1NLZSEFn2n3otckJWCRG9mIQ",
  },
  {
    title: "Explore",
    subheader: "Most popular",
    price: "200",
    buttonVariant: "contained",
    image: `${LessonCredit200}`,
    pi: "price_1NLZTRFn2n3otckJk0ANGJms",
  },
  {
    title: "Master",
    price: "300",
    buttonVariant: "outlined",
    image: `${LessonCredit300}`,
    pi: "price_1NLZTzFn2n3otckJbfNPTVAt",
  },
];

export default function Product() {
  const {user} = useSelector(store => store.user )
  const id = user.id

  useEffect(() => {
    async function fetchConfig() {
      await axios
        .get("/config")
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error fetching config:", error);
        });
    }
    fetchConfig();
  }, []);

  const purchaseCredits = (e, pi) => {
    e.preventDefault();

    const postRequestObj = {
      price: pi,
      quantity: 1,
      metadata: {
        id: id,
      },
    };

    axios
      .post("/create-checkout-session", postRequestObj, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data)
      .then((data) => (window.location.href = data.url))
      .catch((error) => {
        console.error("Error purchasing credits:", error);
      });
  };

  return (
    <Box minHeight="100vh">
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
          Discover the transformative world of tea at our school. Purchase
          lesson credits tailored to your needs. Begin your enchanting tea
          journey today!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} md={4}>
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
                  <CardMedia sx={{ height: 140 }} image={tier.image} />
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      purchaseCredits(e, tier.pi);
                    }}
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
    </Box>
  );
}
