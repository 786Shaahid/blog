import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authManager from '../manager/authManager';
import SignInSignUpForm from './SignInSignUpForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stack, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = { token: localStorage.getItem('token') };
    if (auth.token) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = (values) => {
    const formBody = {
      email: values.email,
      password: values.password,
    };
    
    authManager
      .login(formBody)
      .then((res) => {
        localStorage.setItem(
          'token',
          JSON.stringify({
            token: res.token,
            user: res.user,
          })
        );
        navigate('/dashboard');
      })
      .catch((err) => {
        toast.error(err?.response?.data.message || 'Failed to login');
      });
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
          Login
        </Typography>
        <SignInSignUpForm handleSubmit={handleSubmit} />
     
      <ToastContainer />
    </Stack>
  );
};

export default Login;
