import { types } from '../types/types';

// Activa el modal
export const openModal = () => ({
  type: types.uiOpenModal,
});

// Oculta el modal
export const closeModal = () => ({
  type: types.uiCloseModal,
});

// Muestra el loading
export const showLoading = () => ({
  type: types.uiShowLoading,
});

// Oculta el loading
export const hideLoading = () => ({
  type: types.uiHideLoading,
});
