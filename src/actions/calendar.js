import { types } from '../types/types';

// Agrega un nuevo evento al estado local
export const eventAddNew = (event) => ({
  type: types.calendarAddEvent,
  payload: event,
});

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
