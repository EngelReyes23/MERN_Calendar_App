import moment from "moment";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};
Modal.setAppElement("#root");

// Fecha inicial para el input
const dateNow = moment().minutes(0).seconds(0).add(1, "hours");

export const CalendarModal = () => {
	//#region States
	// Fecha inicial para el input
	const [startDate, setStartDate] = useState(dateNow.toDate());

	// La fecha final se establece después de la fecha inicial
	const [endDate, setEndDate] = useState(
		moment(startDate).add(1, "days").hour(13).toDate()
	);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			startDate: "",
			endDate: "",
			title: "",
			notes: "",
		},
	});

	//#endregion States

	const onSubmit = (data, e) => {
		// e.preventDefault();
		console.log(data);
		e.target.reset();
		e.target.title.focus();
	};

	//#region Handles
	const handleStartDateChange = (e) => {
		setStartDate(e);
		setValue("startDate", e);
		console.log(e);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e);
		setValue("endDate", e);
		console.log(e);
	};
	//#endregion Handles

	return (
		<Modal
			isOpen={true}
			style={customStyles}
			contentLabel="Example Modal"
			className="modal"
			closeTimeoutMS={200}
			overlayClassName="modal-fondo"
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className="container" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={startDate}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						className="form-control"
						onChange={handleEndDateChange}
						minDate={startDate}
						value={endDate}
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className="form-control"
						placeholder="Título del evento"
						autoComplete="off"
						{...register("title", {
							required: {
								value: true,
								message: "El título es requerido",
							},
						})}
					/>
					<small
						id="emailHelp"
						className={`form-text ${
							errors.title ? "text-danger" : "text-muted"
						}`}
					>
						{errors.title ? errors.title.message : "Una descripción corta"}
					</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						{...register("notes", {
							required: {
								value: true,
								message: "Las notas son requeridas",
							},
						})}
					></textarea>
					<small
						id="emailHelp"
						className={`form-text ${
							errors.notes ? "text-danger" : "text-muted"
						}`}
					>
						{errors.notes ? errors.notes.message : "Información adicional"}
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
