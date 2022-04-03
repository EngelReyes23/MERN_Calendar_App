import moment from "moment";
import "moment/locale/es";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//
import { messages } from "../../helpers/calendar-messages-es";
import { Navbar } from "../ui/Navbar";

moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
	{
		title: "All Day Event",
		start: moment().toDate(),
		end: moment().add(2, "hours").toDate(),
		bgColor: "royalblue",
		notes: "This is a note",
	},
];

export const CalendarScreen = () => {
	const eventStyleGetter = (event, start, end, isSelected) => {
		console.log(event, start, end, isSelected);

		const style = {
			backgroundColor: event.bgColor,
			borderRadius: "0px",
			opacity: 0.8,
			color: "white",
		};

		return {
			style,
		};
	};

	return (
		<>
			<Navbar />
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12 min-vh-100 mb-5">
						{/* <div className="height-calendar"> */}
						<Calendar
							localizer={localizer}
							events={events}
							messages={messages}
							eventPropGetter={eventStyleGetter}
						/>
						{/* </div> */}
					</div>
				</div>
			</div>
		</>
	);
};
