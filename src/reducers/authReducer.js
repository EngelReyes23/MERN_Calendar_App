import { types } from '../types/types';

const initialState = {
  isChecking: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Autentica al usuario en el estado local
    case types.authLogin:
      return {
        ...state,
        isChecking: true,
        ...action.payload,
      };

    default:
      return state;
  }
};
