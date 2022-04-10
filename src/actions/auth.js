import Swal from 'sweetalert2';
//
import { axiosClient } from '../helpers/httpClient';
import { types } from '../types/types';
import { hideLoading, showLoading } from './ui';

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
      console.log(error);
      Swal.fire('Error', 'Error al iniciar sesión', 'error');
    } finally {
      dispatch(hideLoading());
    }
  };
};
