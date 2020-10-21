import React, { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { redirectUrl } from '../../config';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    user && user.token && history.push('/');
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: redirectUrl,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);

      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );

      window.localStorage.setItem('emailForRegistration', email);
      setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          placeholder='Email address'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-raised '>
        Register
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
