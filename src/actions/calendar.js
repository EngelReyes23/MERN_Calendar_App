import Swal from 'sweetalert2';
//
import { axiosClient } from '../helpers/httpClient';
import { types } from '../types/types';
import { hideLoading, showLoading } from './ui';

// Agrega un nuevo evento al estado local
const eventAddNew = (event) => ({
  type: types.calendarAddEvent,
  payload: event,
});

export const startAddNew = (eventData) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    // Obteniendo el token
    const token = localStorage.getItem('token') || '';

    const { uid, name } = getState().auth;

    try {
      const { data } = await axiosClient.post('/events', eventData, {
        headers: {
          'x-token': token,
        },
      });

      /* Agregando el evento al estado local solo con los
      valores que nos interesan */
      const { _id: id, __v, ...rest } = data.createdEvent;
      const event = { id, ...rest };
      event.user = {
        _id: uid,
        name,
      };

      dispatch(eventAddNew(event)); // Agregando el evento al estado local

      // Mostrando un mensaje de éxito
      Swal.fire('Correcto', 'El evento se ha creado correctamente', 'success');
    } catch (error) {
      const msg = error.response.data.msg;
      Swal.fire('Error', msg, 'error');
    } finally {
      dispatch(hideLoading());
    }
  };
};

// Establece el evento seleccionado
export const eventSetActive = (event) => ({
  type: types.calendarSetActiveEvent,
  payload: event,
});

// Actualiza el evento seleccionado en el estado local
export const eventUpdate = (event) => ({
  type: types.calendarUpdateEvent,
  payload: event,
});

// Elimina el evento seleccionado del estado local
export const eventDelete = () => ({
  type: types.calendarDeleteEvent,
});
