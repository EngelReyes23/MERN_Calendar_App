import moment from "moment";
//
import { types } from "../types/types";

const initialState = {
	eventList: [
		{
			title: "All Day Event",
			start: moment().toDate(),
			end: moment().add(2, "hours").toDate(),
			bgColor: "royalblue",
			notes: "This is a note",
			user: {
				_id: "5e9f9f9f9f9f9f9f9f9f9f9",
				name: "Juan Perez",
			},
		},
	],
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.calendarAddEvent:
			return {
				...state,
				eventList: [...state.eventList, action.payload],
			};

		case types.calendarSetActiveEvent:
			return {
				...state,
				activeEvent: action.payload,
			};

		default:
			return state;
	}
};
