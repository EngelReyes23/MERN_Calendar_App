import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { eventDelete } from "../../actions/calendar";

export const DeleteFab = () => {
	const dispatch = useDispatch();

	const handleClick = () => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "Una vez eliminado, no podrás recuperar este registro",
			icon: "warning",
			showCancelButton: true,
		}).then((result) => {
			result.isConfirmed && dispatch(eventDelete());
		});
	};

	return (
		<button onClick={handleClick} className="btn btn-danger fab rounded-circle">
			<i className="fas fa-trash"></i>
		</button>
	);
};
