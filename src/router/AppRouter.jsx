import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { StartRenewToken } from '../actions/auth';
//
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Loading } from '../components/ui/Loading';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const {
    auth: { isChecking },
    ui: { isLoading },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(StartRenewToken());
  }, []);

  if (isChecking) return <Loading />;

  return (
    <Router>
      {/* Loading de espera */}
      {isLoading && <Loading />}

      <Routes>
        <Route path='/' element={<CalendarScreen />} />

        <Route path='/login' element={<LoginScreen />} />

        {/* Redirect */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};
