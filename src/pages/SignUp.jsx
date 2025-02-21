import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useState } from "react";

const validationSchema = yup.object({
  // username: yup.string().required("Username is required"), // TODO: Uncomment this line when username feature is added
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signUpUser = async (values, dispatch, navigate, setError) => {
  try {
    const response = await axios.post("https://cmsservice-9e12a2790a1c.herokuapp.com/users/register", values);
    const userData = response.data;
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("🚀 ~ signUpUser ~ axios response :", response)
    localStorage.setItem("isLoggedIn", "true");
    dispatch(setUser(userData));
    navigate("/");
  } catch (error) {
    setError("Error during sign up");
    console.error("Error during sign up:", error);
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      // username: "", // TODO: Uncomment this line when username feature is added
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError("");
      signUpUser(values, dispatch, navigate, setError);
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
        {/* // TODO: Uncomment this line when username feature is added */}
          {/* <TextField
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
          /> */}
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
        {error && <Alert sx={{my: 2}} severity="error">{error}</Alert>}
    </Container>
  );
};

export default SignUp;
