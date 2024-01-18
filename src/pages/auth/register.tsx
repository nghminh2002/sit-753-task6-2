import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
  Box,
  Button,
  CircularProgress,
  Checkbox,
  FormHelperText,
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
import { useRouter } from 'src/hooks/use-router';
import { register } from 'src/redux/slices/authentication';

interface RegisterValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  policy: boolean;
}

const initialValues: RegisterValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  policy: false,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  name: Yup.string().max(255).required('Name is required'),
  password: Yup.string().min(7).max(255).required('Password is required'),
  confirmPassword: Yup.string().required('Confirm password is required'),
  policy: Yup.boolean().oneOf([true], 'This field must be checked'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useMounted();
  const { loading } = useSelector((state) => state.authentication);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const registerData = {
          email: values.email.toLowerCase(),
          password: values.password,
          fullName: values.name,
        };
        await dispatch(register(registerData));

        if (isMounted()) {
          router.push(paths.auth.login);
        }
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
      <Seo title="Register" />
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
            <Typography variant="subtitle2">Back</Typography>
          </Link>
        </Box>
        <Stack
          sx={{ mb: 4 }}
          spacing={1}
        >
          <Typography variant="h5">Register</Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Already have an account? &nbsp;
            <Link
              href={paths.auth.login}
              underline="hover"
              variant="subtitle2"
            >
              Log in
            </Link>
          </Typography>
        </Stack>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Full name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
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
            />
            <TextField
              error={
                !!(formik.touched.confirmPassword && formik.errors.confirmPassword) ||
                formik.values.password !== formik.values.confirmPassword
              }
              fullWidth
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              label="Confirm password"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmPassword}
            />
          </Stack>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              mt: 1,
            }}
          >
            <Checkbox
              checked={formik.values.policy}
              name="policy"
              onChange={formik.handleChange}
            />
            <Typography
              color="text.secondary"
              variant="body2"
            >
              I have read the{' '}
              <Link
                component="a"
                href="#"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {!!(formik.touched.policy && formik.errors.policy) && (
            <FormHelperText error>{formik.errors.policy}</FormHelperText>
          )}
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            disabled={!formik.values.policy || loading}
          >
            {loading ? <CircularProgress /> : 'Register'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
