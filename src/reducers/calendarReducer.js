import { types } from '../types/types';

const initialState = {
  eventList: [
    // {
    //   _id: '1dsf34df2etc',
    //   title: 'All Day Event',
    //   start: moment().toDate(),
    //   end: moment().add(2, 'hours').toDate(),
    //   notes: 'This is a note',
    //   user: {
    //     _id: '5e9f9fd3etc',
    //     name: 'Engel Reyes',
    //   },
    // },
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
          event._id === action.payload._id ? action.payload : event
        ),
      };

    // Elimina un evento
    case types.calendarDeleteEvent:
      return {
        ...state,
        eventList: state.eventList.filter(
          (event) => event._id !== state.activeEvent._id
        ),
        activeEvent: null,
      };

    // Establece la lista de eventos
    case types.calendarSetEventList:
      return {
        ...state,
        eventList: action.payload,
      };

    default:
      return state;
  }
};
