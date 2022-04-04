import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
//
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";

export const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<CalendarScreen />} />

				<Route path="/login" element={<LoginScreen />} />

				{/* Redirect */}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
};
