import moment from "moment";
import "moment/locale/es";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
//
import { eventSetActive } from "../../actions/calendar";
import { openModal } from "../../actions/ui";
import { messages } from "../../helpers/calendar-messages-es";
import { AddNewFab } from "../ui/AddNewFab";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
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
];

export const CalendarScreen = () => {
	//#region Redux
	const { isModalOpen } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	//#endregion Redux

	//#region State
	const [calendarView, setCalendarView] = useState(
		localStorage.getItem("calendarView") || "month"
	);

	//#region Métodos para los eventos del calendario
	// const onDoubleClick = (e) => {
	// 	console.log(e);
	// 	dispatch(openModal());
	// };

	const onSelect = (e) => {
		console.log(e);
		dispatch(eventSetActive(e));
		dispatch(openModal());
	};

	const onViewChange = (e) => {
		setCalendarView(e);
		localStorage.setItem("calendarView", e);
	};
	//#endregion Métodos para los eventos del calendario

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: event.bgColor,
			borderRadius: "0px",
			opacity: 0.8,
			color: "white",
		};

		return { style };
	};

	return (
		<div>
			<Navbar />
			<div className="container">
				<div className="row">
					<div className="col-md-12 min-vh-100 mb-5">
						<Calendar
							localizer={localizer}
							events={events}
							messages={messages}
							eventPropGetter={eventStyleGetter}
							components={{ event: CalendarEvent }}
							// onDoubleClickEvent={onDoubleClick}
							onSelectEvent={onSelect}
							onView={onViewChange}
							view={calendarView}
						/>
					</div>
				</div>
				<AddNewFab isOpen={isModalOpen} />
			</div>{" "}
			{/* Modal */}
			<CalendarModal isOpen={isModalOpen} />
		</div>
	);
};
