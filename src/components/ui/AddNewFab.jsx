import { useDispatch } from "react-redux";
//
import { openModal } from "../../actions/ui";

export const AddNewFab = ({ isOpen }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(openModal());
	};

	return (
		<button
			onClick={handleClick}
			className="btn btn-primary rounded-circle fab"
		>
			{isOpen ? (
				<i className="fas fa-times"></i>
			) : (
				<i className="fas fa-plus"></i>
			)}
		</button>
	);
};
