import React from 'react';
import AdminNav from '../../components/nav/AdminNav';

const AdminDashBoard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <h4>AdminDashBoard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
