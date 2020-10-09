import React, { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { redirectUrl } from '../../config';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input type='email' className='form-control' disabled value={email} />
        <input
          type='password'
          className='form-control'
          placeholder='Password'
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type='submit' className='btn btn-raised '>
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
