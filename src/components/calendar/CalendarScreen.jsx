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
import { DeleteFab } from "../ui/DeleteFab";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	//#region Redux
	const {
		ui: { isModalOpen },
		calendar: { eventList, activeEvent },
	} = useSelector((state) => state);

	const dispatch = useDispatch();
	//#endregion Redux

	//#region State
	const [calendarView, setCalendarView] = useState(
		localStorage.getItem("calendarView") || "month"
	);

	//#region Métodos para los eventos del calendario
	const onDoubleClick = () => {
		dispatch(openModal());
	};

	const onSelectSlot = (e) => {
		dispatch(eventSetActive(null));
	};

	const onSelect = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setCalendarView(e);
		localStorage.setItem("calendarView", e);
	};
	//#endregion Métodos para los eventos del calendario

	const eventStyleGetter = (event) => {
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
							events={eventList}
							localizer={localizer}
							messages={messages}
							view={calendarView}
							eventPropGetter={eventStyleGetter}
							components={{ event: CalendarEvent }}
							onDoubleClickEvent={onDoubleClick}
							onSelectEvent={onSelect}
							onView={onViewChange}
							onSelectSlot={onSelectSlot}
							selectable={true}
						/>
					</div>
				</div>

				{activeEvent ? <DeleteFab /> : <AddNewFab />}
			</div>{" "}
			{/* Modal */}
			{isModalOpen && <CalendarModal />}
		</div>
	);
};
