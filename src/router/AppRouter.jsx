import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//
import { StartRenewToken } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Loading } from '../components/ui/Loading';
import { NotFound } from '../components/ui/NotFound';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  //#region Redux
  const dispatch = useDispatch();
  const {
    auth: { isChecking, isLogged },
    ui: { isLoading },
  } = useSelector((state) => state);
  //#endregion Redux

  useEffect(() => {
    dispatch(StartRenewToken());
  }, []);

  if (isChecking) return <Loading />;

  return (
    <Router>
      {/* Loading de espera */}
      {isLoading && <Loading />}

      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute isLogged={isLogged} component={CalendarScreen} />
          }
        />

        <Route
          path='/login'
          element={<PublicRoute isLogged={isLogged} component={LoginScreen} />}
        />

        {/* Redirect */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};
