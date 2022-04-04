import React from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import ReactDOM from "react-dom";
import "sweetalert2/dist/sweetalert2.min.css";
//
import { CalendarApp } from "./CalendarApp";
import "./styles.css";

ReactDOM.render(<CalendarApp />, document.getElementById("root"));
