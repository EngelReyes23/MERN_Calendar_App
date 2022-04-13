import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ isLogged, component: Component }) => {
  return isLogged ? <Component /> : <Navigate to='/login' replace='true' />;
};

PrivateRoute.prototype = {
  isLogged: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
