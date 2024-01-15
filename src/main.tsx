import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import setupAxiosInterceptors from './config/axios-interceptor';

import { App } from 'src/app';

setupAxiosInterceptors(() => {});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
