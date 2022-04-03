import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//
import { Navbar } from "../ui/Navbar";

const events = [
	{
		title: "All Day Event",
		start: moment().toDate(),
		end: moment().add(2, "hours").toDate(),
		bgColor: "#fafafa",
	},
];

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	return (
		<>
			<Navbar />
			<div className="container">
				<div className="row">
					<div className="col-md-12 min-vh-100">
						{/* <div className="height-calendar"> */}
						<Calendar localizer={localizer} events={events} />
						{/* </div> */}
					</div>
				</div>
			</div>
		</>
	);
};
