import { types } from '../types/types';

const initialState = {
  isChecking: true,
  isLogged: false,
  // uid: '',
  // name: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Autentica al usuario en el estado local
    case types.authLogin:
      return {
        ...state,
        isChecking: false,
        isLogged: true,
        ...action.payload,
      };

    //
    case types.authLogout:
      return {
        ...initialState,
      };

    case types.authChecking:
      return {
        ...state,
        isChecking: true,
      };

    case types.authChecked:
      return {
        ...state,
        isChecking: false,
      };

    default:
      return state;
  }
};
