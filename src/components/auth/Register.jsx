import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
//
import { startRegister } from '../../actions/auth';

export const Register = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    //  dispatch()
    if (data.password !== data.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }
    const { name, password, email } = data;
    dispatch(startRegister({ name, password, email }));
  };

  return (
    <div className='col-md-6 login-form-2'>
      <h3>Registro</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          {errors.name && (
            <div className='invalid-feedback invalid-feedback d-block mb-1 text-white'>
              {errors.name.message}
            </div>
          )}
          <input
            type='text'
            className={`form-control ${errors.name && 'is-invalid'}`}
            placeholder='Nombre'
            {...register('name', {
              required: {
                value: true,
                message: 'El nombre es requerido',
              },
            })}
          />
        </div>
        <div className='form-group'>
          {errors.email && (
            <div className='invalid-feedback d-block mb-1 text-white'>
              {errors.email.message}
            </div>
          )}
          <input
            type='email'
            className={`form-control ${errors.email && 'is-invalid'}`}
            placeholder='Correo'
            {...register('email', {
              required: {
                value: true,
                message: 'El correo es requerido',
              },
            })}
          />
        </div>
        <div className='form-group'>
          {errors.password && (
            <div className='invalid-feedback d-block mb-1 text-white'>
              {errors.password.message}
            </div>
          )}
          <input
            type='password'
            className={`form-control ${errors.password && 'is-invalid'}`}
            placeholder='Contraseña'
            {...register('password', {
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
            })}
          />
        </div>

        <div className='form-group'>
          {errors.confirmPassword && (
            <div className='invalid-feedback d-block mb-1 text-white'>
              {errors.confirmPassword.message}
            </div>
          )}
          <input
            type='password'
            className={`form-control ${errors.password && 'is-invalid'}`}
            placeholder='Repita la contraseña'
            {...register('confirmPassword', {
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
            })}
          />
        </div>

        <div className='form-group'>
          <input type='submit' className='btnSubmit' value='Crear cuenta' />
        </div>
      </form>
    </div>
  );
};
