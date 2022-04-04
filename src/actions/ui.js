import { types } from "../types/types";

// Activa el modal
export const openModal = () => ({
	type: types.uiOpenModal,
});

// Oculta el modal
export const closeModal = () => ({
	type: types.uiCloseModal,
});
