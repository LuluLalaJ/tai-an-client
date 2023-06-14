import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/userSlice";

export default function SignUp() {
  const { isSignedIn, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username"),
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      username:"",
      firstName: "",
      lastName:"",
      email:"",
      password: "",
      role:"student"
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // CHECK WITH PRINCETON ON THIS
      values["first_name"] = values.firstName
      values["last_name"] = values.lastName
      dispatch(signUpUser(values));
    },
  });

  const { values, handleChange, handleSubmit, touched, errors } = formik;

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={values.username}
                onChange={handleChange}
                error={!!touched.username && !!errors.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                error={!!touched.firstName && !!errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={values.lastName}
                onChange={handleChange}
                error={!!touched.lastName && !!errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                error={!!touched.password && !!errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={values.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="student"
                  name="role"
                  control={<Radio />}
                  label="I'm a student"
                />
                <FormControlLabel
                  value="teacher"
                  control={<Radio />}
                  label="I'm a teacher"
                  name="role"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {error && <Alert severity="error">{error.error}</Alert>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
