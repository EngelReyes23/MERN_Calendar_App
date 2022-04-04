import moment from "moment";
import "moment/locale/es";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//
import { messages } from "../../helpers/calendar-messages-es";
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
	//#region State
	const [calendarView, setCalendarView] = useState(
		localStorage.getItem("calendarView") || "month"
	);

	//#region Métodos para los eventos del calendario
	const onDoubleClick = (e) => {
		console.log(e);
	};

	const onSelect = (e) => {
		console.log(e);
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
						{/* <div className="height-calendar"> */}
						<Calendar
							localizer={localizer}
							events={events}
							messages={messages}
							eventPropGetter={eventStyleGetter}
							components={{ event: CalendarEvent }}
							onDoubleClickEvent={onDoubleClick}
							onSelectEvent={onSelect}
							onView={onViewChange}
							view={calendarView}
						/>
						{/* </div> */}
					</div>
				</div>
			</div>
			<CalendarModal />
		</div>
	);
};
