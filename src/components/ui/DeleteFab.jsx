export const DeleteFab = ({ handleEventDelete }) => {
  return (
    <button
      onClick={handleEventDelete}
      className='btn btn-danger fab rounded-circle'
    >
      <i className='fas fa-trash'></i>
    </button>
  );
};
