import { paths } from 'src/paths';
import { useSelector } from 'src/redux/store';
import { ReactNode } from 'react';
import { localStorageConfig } from 'src/config';
import { Navigate } from 'react-router-dom';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem(localStorageConfig.accessToken);
  const { isAuthenticated } = useSelector((state) => state.authentication);

  if (!token && !isAuthenticated) {
    return (
      <Navigate
        to={paths.auth.login}
        replace={true}
      />
    );
  }
  return children;
};

export default AuthProvider;
