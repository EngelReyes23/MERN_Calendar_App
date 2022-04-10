import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ isChecking, component: Component }) => {
  return isChecking ? <Component /> : <Navigate to='/login' replace='true' />;
};
