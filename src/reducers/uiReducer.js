import { types } from '../types/types';

const initialState = {
  isModalOpen: false,
  isLoading: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        isModalOpen: true,
      };

    case types.uiCloseModal:
      return {
        ...state,
        isModalOpen: false,
      };

    case types.uiShowLoading:
      return {
        ...state,
        isLoading: true,
      };

    case types.uiHideLoading:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
