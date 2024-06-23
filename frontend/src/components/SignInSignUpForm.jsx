
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MUILink,
} from '@mui/material';


const UserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('required'),
});

const SignInSignUpForm = ({ handleSubmit, isRegistration }) => {
  let schema = UserSchema;

  if (isRegistration) {
    schema = schema.concat(
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      })
    );
  }

  const initialValues = {
    email: '',
    password: '',
  };

  if (isRegistration) initialValues.name = '';

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, touched, errors }) => (
        <Box
          component={Form}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: { xs: '90%', md: '400px' }, 
            mt: 4,
            p: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: 1,
          }}
        >
          {isRegistration && (
            <>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </>
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
          {isRegistration ? (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Already registered?{' '}
              <MUILink component={Link} to="/login" underline="hover">
                Click to login
              </MUILink>
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Need registration?{' '}
              <MUILink component={Link} to="/register" underline="hover">
                Click to register
              </MUILink>
            </Typography>
          )}
        </Box>
      )}
    </Formik>
  );
};

export default SignInSignUpForm;
