import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ isChecking, component: Component }) => {
  return isChecking ? <Navigate to='/' /> : <Component />;
};
