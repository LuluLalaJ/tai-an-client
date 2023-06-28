import * as React from "react";
import { Container, Typography } from "@mui/material";
import { Info } from "../../components";

function About() {
  const backgroundImage = "https://shorturl.at/finot";
  const Google_API_Key = process.env.REACT_APP_Google_API;

  return (
    <>
      <Container
        sx={{
          py: 20,
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
        }}
      >
        <Typography color="white" align="center" variant="h1" marked="center">
          Tai-an Tea School
        </Typography>
      </Container>
      <Info />
      <Container>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12086.855382566611!2d-73.9628019!3d40.7683181!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258ebb5fd2f0f%3A0xc80a0a30cd162e77!2sUrasenke%20Inc!5e0!3m2!1sen!2sus!4v1687993678439!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Container>
    </>
  );
}

export default About;
