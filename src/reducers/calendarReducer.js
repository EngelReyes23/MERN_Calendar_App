import moment from 'moment';
//
import { types } from '../types/types';

const initialState = {
  eventList: [
    {
      title: 'All Day Event',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgColor: 'royalblue',
      notes: 'This is a note',
      user: {
        _id: '5e9f9f9f9f9f9f9f9f9f9f9',
        name: 'Juan Perez',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    // Agrega un evento nuevo
    case types.calendarAddEvent:
      return {
        ...state,
        eventList: [...state.eventList, action.payload],
      };

    // Establece el evento activo
    case types.calendarSetActiveEvent:
      return {
        ...state,
        activeEvent: action.payload,
      };

    // Actualiza un evento
    case types.calendarUpdateEvent:
      return {
        ...state,
        eventList: state.eventList.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    // Elimina un evento
    case types.calendarDeleteEvent:
      return {
        ...state,
        eventList: state.eventList.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };

    default:
      return state;
  }
};
