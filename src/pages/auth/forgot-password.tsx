import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';
import { useDispatch, useSelector } from 'src/redux/store';
import { useMounted } from 'src/hooks/use-mounted';
import { forgotPassword } from 'src/redux/slices/authentication';

interface ForgotPasswordValues {
  email: string;
}

const initialValues: ForgotPasswordValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const isMounted = useMounted();

  const { loading, forgotEmailSent } = useSelector((state) => state.authentication);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(forgotPassword(values.email));
      } catch (err) {
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Seo title="Forgot Password" />
      <div>
        <Box sx={{ mb: 4 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.auth.login}
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
            }}
            underline="hover"
          >
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowLeftIcon />
            </SvgIcon>
            <Typography variant="subtitle2">Back to Login</Typography>
          </Link>
        </Box>
        <Stack
          sx={{ mb: 4 }}
          spacing={1}
        >
          <Typography variant="h5">{forgotEmailSent ? 'Email sent' : 'Forgot password'}</Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {forgotEmailSent
              ? `If there is a PTE Magic account registered to ${formik.values.email} we have sent instructions for how to reset your password.`
              : 'Please insert your email in the input below and we will send an email with the link to reset your password.'}
          </Typography>
        </Stack>
        {!forgotEmailSent && (
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              autoFocus
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : 'Send reset link'}
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default ForgotPasswordPage;
