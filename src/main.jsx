import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css"; // React-BigCalendar css
import "react-calendar/dist/Calendar.css"; // React-DateTimePicker css
import "react-clock/dist/Clock.css"; // React-DateTimePicker css
import "react-datetime-picker/dist/DateTimePicker.css"; // React-DateTimePicker css
import ReactDOM from "react-dom";
import "sweetalert2/dist/sweetalert2.min.css"; // SweetAlert2 css
//
import { CalendarApp } from "./CalendarApp";
import "./styles.css";

ReactDOM.render(<CalendarApp />, document.getElementById("root"));
