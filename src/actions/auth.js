import Swal from 'sweetalert2';
//
import { axiosClient } from '../helpers/httpClient';
import { types } from '../types/types';
import { hideLoading, showLoading } from './ui';

//#region LOGIN
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
      const { data } = await axiosClient.post('/auth', {
        email,
        password,
      });

      // Si el usuario se autentica correctamente
      if (data.ok) {
        // Guarda el token en el localStorage
        localStorage.setItem('token', data.token);
        // Guarda la fecha del creación del token
        localStorage.setItem('DateCreationToken', new Date().getTime());

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
//#endregion LOGIN

//#region REGISTER
// Inicia el proceso de registro en el servidor
export const startRegister = (userData) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { data } = await axiosClient.post('/auth/register', userData);

      if (data.ok) {
        // Guarda el token en el localStorage
        localStorage.setItem('token', data.token);
        // Guarda la fecha del creación del token
        localStorage.setItem('DateCreationToken', new Date().getTime());

        dispatch(
          login({
            uid: data.uid,
            name: data.name,
          })
        );
        Swal.fire('Registro exitoso', '', 'success');
      }
    } catch (error) {
      const msg = error.response.data.msg;
      Swal.fire('Error', msg, 'error');
    } finally {
      dispatch(hideLoading());
    }
  };
};
//#endregion REGISTER

// Inicia el proceso de renovación de token
export const StartRenewToken = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // Obtiene el token del localStorage
      const token = localStorage.getItem('token') || '';

      const { data } = await axiosClient.get('/auth/renewToken', {
        headers: {
          'x-token': token,
        },
      });

      if (data) {
        // Guarda el token en el localStorage
        localStorage.setItem('token', data.token);
        // Guarda la fecha del creación del token
        localStorage.setItem('DateCreationToken', new Date().getTime());

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
      dispatch(hideLoading());
    }
  };
};
