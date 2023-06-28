import React from 'react';
import { Box, Typography, Container, Link} from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      <Link color="inherit" href="https://github.com/LuluLalaJ">
        © Chen Jiang
      </Link>{" "}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="md"
      sx={{display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="body1"></Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer
