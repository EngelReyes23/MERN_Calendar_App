import moment from 'moment';
import 'moment/locale/es';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
//
import {
  eventDelete,
  eventSetActive,
  startGetEvents,
} from '../../actions/calendar';
import { openModal } from '../../actions/ui';
import { messages } from '../../helpers/calendar-messages-es';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  // #region Redux
  const {
    auth: { name, uid },
    ui: { isModalOpen },
    calendar: { eventList, activeEvent },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  // #endregion Redux

  // #region State
  const [calendarView, setCalendarView] = useState(
    localStorage.getItem('calendarView') || 'month'
  );
  // #endregion State

  useEffect(() => {
    dispatch(startGetEvents());
  }, []);

  // #region Métodos para los eventos del calendario
  const onDoubleClick = () => {
    dispatch(openModal());
  };

  // Establece el evento activo en null cuando se selecciona otra casilla
  const onSelectSlot = (e) => {
    activeEvent !== null && dispatch(eventSetActive(null));
  };

  // Establece el evento activo
  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  // Establece la vista del calendario
  const onViewChange = (e) => {
    setCalendarView(e);
    localStorage.setItem('calendarView', e);
  };

  // Elimina un evento
  const handleEventDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este registro',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      result.isConfirmed && dispatch(eventDelete());
    });
  };
  // #endregion Métodos para los eventos del calendario

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: uid === event.user._id ? 'royalblue' : 'crimson',
      borderRadius: '0px',
      opacity: 0.8,
      cursor: 'pointer',
      color: 'white',
    };

    return { style };
  };

  return (
    <div>
      <Navbar name={name} />
      <div
        className='container'
        onKeyDown={({ code }) => {
          code === 'Delete' && handleEventDelete();
        }}
      >
        <div className='row'>
          <div className='col-md-12 min-vh-100 mb-5'>
            <Calendar
              events={eventList}
              localizer={localizer}
              messages={messages}
              view={calendarView}
              eventPropGetter={eventStyleGetter}
              components={{ event: CalendarEvent }}
              onDoubleClickEvent={onDoubleClick}
              onSelectEvent={onSelect}
              onView={onViewChange}
              onSelectSlot={onSelectSlot}
              selectable={true}
            />
          </div>
        </div>

        {activeEvent ? (
          <DeleteFab handleEventDelete={handleEventDelete} />
        ) : (
          <AddNewFab />
        )}
      </div>
      {/* Modal */}
      {isModalOpen && <CalendarModal />}
    </div>
  );
};
