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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { useMounted } from 'src/hooks/use-mounted';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from 'src/redux/slices/authentication';
import { useRouter } from 'src/hooks/use-router';

interface ResetPasswordValues {
  password: string;
  passwordConfirm: string;
}

const initialValues: ResetPasswordValues = {
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object({
  password: Yup.string().min(7, 'Must be at least 7 characters').max(255).required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const isMounted = useMounted();
  const router = useRouter();
  const [queryParameters] = useSearchParams();

  const { loading, errorMessage } = useSelector((state) => state.authentication);
  const [error, setError] = useState(false);
  const resetKey = queryParameters.get('key');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values): Promise<void> => {
      try {
        if (resetKey) {
          await dispatch(resetPassword(resetKey, values.password));
        }
        if (!loading && errorMessage !== '') {
          router.push(paths.auth.login);
        } else {
          setError(true);
        }
      } catch (err) {
        if (isMounted()) {
          setError(true);
        }
      }
    },
  });

  useEffect(() => {
    if (!resetKey) {
      setError(true);
    } else {
      setError(false);
    }
  }, [dispatch]);

  return (
    <>
      <Seo title="Reset Password" />
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
          <Typography variant="h5">Reset password</Typography>
          {error && (
            <Typography
              color="error.main"
              variant="h6"
            >
              {errorMessage}
            </Typography>
          )}
        </Stack>
        {!error && (
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={3}>
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
                autoComplete="new-password"
              />
              <TextField
                error={
                  !!(formik.touched.passwordConfirm && formik.errors.passwordConfirm) ||
                  formik.values.password !== formik.values.passwordConfirm
                }
                fullWidth
                helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                label="Password (Confirm)"
                name="passwordConfirm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.passwordConfirm}
                autoComplete="new-password"
              />
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              disabled={loading || formik.values.password !== formik.values.passwordConfirm}
            >
              {loading ? <CircularProgress /> : 'Reset'}
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPasswordPage;
