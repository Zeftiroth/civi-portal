import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(values));
      // Store login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      // Dispatch action to save user info to the store
      dispatch(setUser(values));
      // Redirect to the home page
      navigate("/");
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <MuiLink component={Link} to="/login" variant="body2">
            Already have an account? Login
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
