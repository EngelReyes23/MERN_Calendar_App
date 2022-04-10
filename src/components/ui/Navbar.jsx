import { useDispatch } from 'react-redux';
//
import { startLogout } from '../../actions/auth';

export const Navbar = ({ name }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className={'navbar navbar-dark bg-dark mb-4'}>
      <span className={'navbar-brand'}>{name}</span>

      <button className={'btn btn-outline-danger'} onClick={handleLogout}>
        <i className={'fa fa-sign-out'}></i>
        <span className='ml-1'>Salir</span>
      </button>
    </div>
  );
};
