import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../redux/userSlice";


export default function Signin() {
  const { isSignedIn, signInError } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username").max(20),
    password: yup.string().required("Must enter password").max(125),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role:"student"
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(signInUser(values));
    },
  });

  const { values, handleChange, handleSubmit, touched, errors } = formik;

  if (isSignedIn) {
    return <Navigate to="/" />
  }
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?matcha)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              value={values.username}
              error={!!touched.username && !!errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={values.password}
              error={!!touched.password && !!errors.password}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {signInError && <Alert severity="error">{signInError.error}</Alert>}
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"/signup"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
