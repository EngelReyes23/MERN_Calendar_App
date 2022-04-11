import moment from 'moment';
import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
//
import {
  eventSetActive,
  eventUpdate,
  startAddNew,
} from '../../actions/calendar';
import { closeModal } from '../../actions/ui';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

// Fecha inicial para el input
const dateNow = moment().minutes(0).seconds(0).add(1, 'hours');

export const CalendarModal = () => {
  //#region Redux
  const dispatch = useDispatch();

  const { activeEvent } = useSelector((state) => state.calendar);
  //#endregion Redux

  //#region States
  // Fecha inicial para el input
  const [startDate, setStartDate] = useState(dateNow.toDate());

  // La fecha final se establece después de la fecha inicial
  const [endDate, setEndDate] = useState(
    moment(startDate).add(1, 'hour').toDate()
  );

  // Valores del formulario
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      start: startDate,
      end: endDate,
    },
  });
  //#endregion States

  //#region useEffect
  useEffect(() => {
    if (activeEvent) {
      reset(activeEvent);
      setStartDate(activeEvent.start);
      setEndDate(activeEvent.end);
    }
  }, [activeEvent, reset]);
  //#endregion useEffect

  //#region Methods
  const handleCloseModal = () => {
    dispatch(eventSetActive(null));
    dispatch(closeModal());
  };

  const onSubmit = (data) => {
    // TODO: implementar de mejor manera
    if (data.end && data.start) {
      if (moment(data.start).isSameOrAfter(data.end)) {
        Swal.fire(
          'Error',
          'La fecha final debe ser mayor a la fecha inicial',
          'error'
        );
        return;
      }

      !activeEvent ? dispatch(startAddNew(data)) : dispatch(eventUpdate(data));

      handleCloseModal();
    } else Swal.fire('Error', 'Fechas no válidas', 'error');
  };
  //#endregion Methods

  //#region Handles
  const handleStartDateChange = (e) => {
    setStartDate(e);
    setValue('start', e);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setValue('end', e);
  };
  //#endregion Handles

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      contentLabel='Example Modal'
      className='modal'
      closeTimeoutMS={200}
      overlayClassName='modal-fondo'
      onRequestClose={handleCloseModal}
    >
      <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
      <hr />

      <form className='container' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className='form-control'
            minDate={startDate}
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${errors.title && 'is-invalid'}`}
            placeholder='Título del evento'
            autoComplete='off'
            {...register('title', {
              required: {
                value: true,
                message: 'El título es requerido',
              },
              minLength: {
                value: 3,
                message: 'El título debe tener al menos 3 caracteres',
              },
            })}
          />

          <small
            className={`form-text ${
              errors.title ? 'text-danger' : 'text-muted'
            }`}
          >
            {errors.title ? errors.title.message : 'Una descripción corta'}
          </small>
        </div>

        <div className='form-group'>
          <textarea
            type='text'
            className={`form-control`}
            placeholder='Notas'
            rows='5'
            {...register('notes')}
          ></textarea>

          <small
            id='emailHelp'
            className={`form-text ${
              errors.notes ? 'text-danger' : 'text-muted'
            }`}
          >
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span>Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
