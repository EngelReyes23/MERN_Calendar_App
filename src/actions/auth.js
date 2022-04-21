import Swal from 'sweetalert2';
//
import { axiosInstance } from '../helpers/axiosInstance';
import { types } from '../types/types';
import { calendarLogout } from './calendar';
import { hideLoading, showLoading } from './ui';

// #region LOGIN
// Autentica al usuario en el estado local
const login = (userInfo) => ({
  type: types.authLogin,
  payload: userInfo,
});

// Inicia el proceso del login en el servidor
export const startLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { data } = await axiosInstance.post('/auth', {
        email,
        password,
      });

      // Si el usuario se autentica correctamente
      if (data.ok) {
        // Guarda el token en el sessionStorage
        sessionStorage.setItem('token', data.token);
        // Guarda la fecha del creación del token
        sessionStorage.setItem('DateCreationToken', new Date().getTime());

        // Inicia el proceso de autenticación en el estado local
        dispatch(
          login({
            uid: data.uid,
            name: data.name,
          })
        );
      }
    } catch (error) {
      const msg = error.response.data.msg;
      Swal.fire('Error', msg, 'error');
    } finally {
      dispatch(hideLoading());
    }
  };
};
// #endregion LOGIN

// #region REGISTER
// Inicia el proceso de registro en el servidor
export const startRegister = (userData) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { data } = await axiosInstance.post('/auth/register', userData);

      if (data.ok) {
        // Guarda el token en el sessionStorage
        sessionStorage.setItem('token', data.token);
        // Guarda la fecha del creación del token
        sessionStorage.setItem('DateCreationToken', new Date().getTime());

        dispatch(
          login({
            uid: data.uid,
            name: data.name,
          })
        );
      }
    } catch (error) {
      const msg = error.response.data.msg;
      Swal.fire('Error', msg, 'error');
    } finally {
      dispatch(hideLoading());
    }
  };
};
// #endregion REGISTER

// #region TOKEN
// Inicia el proceso de renovación de token
export const StartRenewToken = () => {
  return async (dispatch) => {
    dispatch(checking());
    try {
      // Obtiene el token del sessionStorage
      const token = sessionStorage.getItem('token') || '';

      const { data } = await axiosInstance.get('/auth/renewToken', {
        headers: {
          'x-token': token,
        },
      });

      if (data) {
        // Guarda el token en el sessionStorage
        sessionStorage.setItem('token', data.token);
        // Guarda la fecha del creación del token
        sessionStorage.setItem('DateCreationToken', new Date().getTime());

        dispatch(
          login({
            uid: data.uid,
            name: data.name,
          })
        );
      }
    } catch (error) {
      console.log(error.response.data.msg);
    } finally {
      dispatch(checked());
    }
  };
};
// #endregion TOKEN

// #region LOGOUT
// Restaura el estado inicial
const logout = () => ({
  type: types.authLogout,
});

// Elimina el token del sessionStorage
export const startLogout = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    sessionStorage.clear();

    dispatch(logout());
    dispatch(calendarLogout());
    dispatch(hideLoading());
    dispatch(checked());
  };
};
// #endregion LOGOUT

const checking = () => ({ type: types.authChecking });
const checked = () => ({ type: types.authChecked });
