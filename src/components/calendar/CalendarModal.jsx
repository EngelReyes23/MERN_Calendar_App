import { useState } from "react";
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

export const CalendarModal = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<Modal
			isOpen={isOpen}
			style={customStyles}
			contentLabel="Example Modal"
			className="modal"
			closeTimeoutMS={200}
			overlayClassName="modal-fondo"
			onRequestClose={() => setIsOpen(false)}
		>
			<h1>Calendar Modal</h1>
			<p>body</p>
		</Modal>
	);
};
