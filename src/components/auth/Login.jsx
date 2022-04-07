import { useForm } from 'react-hook-form';

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: 'engelreyes23@gmail.com',
      password: 'Reyes123',
    },
  });

  const onSubmitLogin = (data) => {
    console.log('🚀 ~ onSubmitLogin ~ data', data);
  };

  return (
    <div className='col-md-6 login-form-1'>
      <h3>Ingreso</h3>

      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className='form-group'>
          {errors.email && (
            <div className='invalid-feedback d-block mb-1'>
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
            <div className='invalid-feedback d-block mb-1'>
              {errors.password.message}
            </div>
          )}

          <input
            type='password'
            className={`form-control ${errors.password && 'is-invalid'}`}
            placeholder='Contraseña'
            {...register('password', {
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
            })}
          />
        </div>

        <div className='form-group'>
          <input type='submit' className='btnSubmit' value='Login' />
        </div>
      </form>
    </div>
  );
};
