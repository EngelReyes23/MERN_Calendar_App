import { types } from "../types/types";

export const eventAddNew = (event) => ({
	type: types.calendarAddEvent,
	payload: event,
});

export const eventSetActive = (event) => ({
	type: types.calendarSetActiveEvent,
	payload: event,
});

export const eventUpdate = (event) => ({
	type: types.calendarUpdateEvent,
	payload: event,
});

export const eventDelete = (id) => ({
	type: types.calendarDeleteEvent,
	payload: id,
});
