import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../api/auth';

const AdminRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    user &&
      user.token &&
      currentAdmin(user.token)
        .then((res) => {
          console.log('CURRENT ADMIN RES', res.data);
          setOk(true);
        })
        .catch((err) => {
          console.log('ADMIN ROUTE ERROR', err);
          setOk(false);
        });
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
