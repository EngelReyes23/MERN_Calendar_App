import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ isLogged, component: Component }) => {
  return isLogged ? <Navigate to='/' /> : <Component />;
};
