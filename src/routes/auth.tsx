import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';

import { Layout as AuthLayout } from 'src/layouts/auth/auth-layout';
import { Outlet } from 'react-router-dom';

const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
const LoginPage = lazy(() => import('src/pages/auth/login'));
const RegisterPage = lazy(() => import('src/pages/auth/register'));
const ResetPasswordPage = lazy(() => import('src/pages/auth/reset-password'));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        element: (
          <AuthLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
];
