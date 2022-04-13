import Swal from 'sweetalert2';
//
import { axiosInstance } from '../helpers/axiosInstance';
import { types } from '../types/types';
import { hideLoading, showLoading } from './ui';

// Agrega un nuevo evento al estado local
const eventAddNew = (event) => ({
  type: types.calendarAddEvent,
  payload: event,
});

// Agrega un nuevo evento a la base de datos
export const startAddNew = (eventData) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    // Obteniendo el token
    const token = localStorage.getItem('token') || '';

    const { uid, name } = getState().auth;

    try {
      const { data } = await axiosInstance.post('/events', eventData, {
        headers: {
          'x-token': token,
        },
      });

      if (data.ok) {
        eventData.user = {
          _id: uid,
          name,
        };

        dispatch(eventAddNew(eventData)); // Agregando el evento al estado local

        // Mostrando un mensaje de éxito
        Swal.fire('Success', 'El evento se ha creado correctamente', 'success');
      }
    } catch (error) {
      const msg = error.response.data.msg;
      Swal.fire('Error', msg, 'error');
    } finally {
      dispatch(hideLoading());
    }
  };
};

// Establece la lista de eventos en el estado local
const setEventList = (eventList) => ({
  type: types.calendarSetEventList,
  payload: eventList,
});

export const startGetEvents = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    // Obteniendo el token
    const token = localStorage.getItem('token') || '';

    try {
      const { data } = await axiosInstance.get('/events', {
        headers: {
          'x-token': token,
        },
      });

      /* Eliminando campos innecesarios y
        convirtiendo los strings a tipo Date */
      const eventList = data.eventList.map((event) => {
        delete event.__v;
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        return event;
      });

      // Estableciendo la lista de eventos en el estado local
      dispatch(setEventList(eventList));
    } catch (error) {
      console.log(error);
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
