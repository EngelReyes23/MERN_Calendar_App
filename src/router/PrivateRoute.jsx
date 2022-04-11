import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ isLogged, component: Component }) => {
  return isLogged ? <Component /> : <Navigate to='/login' replace='true' />;
};
