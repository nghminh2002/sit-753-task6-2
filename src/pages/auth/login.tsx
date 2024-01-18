import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';
import { GoogleSignInButton } from 'src/components/google-login-button';
import { useDispatch, useSelector } from 'src/redux/store';
import { login } from '../../redux/slices/authentication';
import { useRouter } from 'src/hooks/use-router';
import { useMounted } from 'src/hooks/use-mounted';
import { useEffect } from 'react';

interface LoginValues {
  email: string;
  password: string;
  submit: null;
}

const initialValues: LoginValues = {
  email: '',
  password: '',
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useMounted();

  const { loading, errorMessage, isAuthenticated } = useSelector((state) => state.authentication);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const loginData = {
          email: values.email,
          password: values.password,
        };
        await dispatch(login(loginData));

        if (isAuthenticated && errorMessage !== '') {
          router.push(paths.dashboard.index);
        }
      } catch (err) {
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(paths.dashboard.index);
    }
  }, [dispatch, isAuthenticated]);

  const responseGoogleSuccess = async (socialToken: string) => {
    const userData = {
      socialNetwork: 'google',
      socialToken,
    };
    localStorage.clear();
    await dispatch(login(userData));
  };

  return (
    <>
      <Seo title="Login" />
      <div>
        <Box sx={{ mb: 4 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.index}
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
            }}
            underline="hover"
          >
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowLeftIcon />
            </SvgIcon>
            <Typography variant="subtitle2">Back</Typography>
          </Link>
        </Box>
        <Stack
          sx={{ mb: 4 }}
          spacing={1}
        >
          <Typography variant="h5">Log in</Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Don&apos;t have an account? &nbsp;
            <Link
              href={paths.auth.register}
              underline="hover"
              variant="subtitle2"
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              autoFocus
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              autoComplete="current-password"
            />
          </Stack>
          <Button
            fullWidth
            sx={{ mt: 3 }}
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress /> : 'Login'}
          </Button>
          <Grid
            container
            sx={{ mt: 4 }}
          >
            <Grid
              item
              xs={4}
              color="text.disabled"
              sx={{
                border: '1px solid',
                width: '100%',
                height: '1px',
              }}
            />
            <Grid
              item
              xs={4}
              style={{ textAlign: 'center', marginTop: '-12px' }}
            >
              <Typography variant="subtitle2">or continue with</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              color="text.disabled"
              sx={{
                border: '1px solid',
                width: '100%',
                height: '1px',
              }}
            />
          </Grid>
          <Box sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
            <GoogleSignInButton login={responseGoogleSuccess} />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Link
              color="text.primary"
              href={paths.auth.forgotPassword}
              sx={{
                justifyContent: 'center',
                display: 'flex',
              }}
              underline="hover"
            >
              <Typography variant="subtitle2">Forgot password?</Typography>
            </Link>
          </Box>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
