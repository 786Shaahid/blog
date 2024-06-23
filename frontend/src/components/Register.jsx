import { useNavigate } from "react-router-dom";
import userManager from "../manager/userManager.js";
import SignInSignUpForm from "./SignInSignUpForm.jsx";
import { useEffect } from "react";
import {  Stack, Typography } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = { token: localStorage.getItem("token") };
    if (auth.token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = (values) => {
    const formBody = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    userManager
      .createUser(formBody)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <SignInSignUpForm handleSubmit={handleSubmit} isRegistration />
      </Stack>
  );
};

export default Register;