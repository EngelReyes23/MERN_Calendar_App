import { useDispatch } from 'react-redux';
//
import { openModal } from '../../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <button
      onClick={handleClick}
      className='btn btn-primary rounded-circle fab'
    >
      <i className='fas fa-plus'></i>
    </button>
  );
};
