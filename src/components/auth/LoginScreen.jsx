import { Login } from './Login';
import './loginScreen.css';
import { Register } from './Register';

export const LoginScreen = () => {
  return (
    <div className='container login-container'>
      <div className='row'>
        <Login />

        <Register />
      </div>
    </div>
  );
};
