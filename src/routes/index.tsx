import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

import { authRoutes } from './auth';
import AuthProvider from 'src/contexts/auth-provider';

const HomePage = lazy(() => import('src/pages/index'));

export const routes: RouteObject[] = [
  {
    element: (
      <AuthProvider>
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: '/dashboard',
        element: <HomePage />,
      },
    ],
  },
  ...authRoutes,
];
