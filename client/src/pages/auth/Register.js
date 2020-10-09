import React, { useState } from 'react';

import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { redirectUrl } from '../../config';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: redirectUrl,
      handleCodeInApp: true,
    };

    try {
      const response = await auth.sendSignInLinkToEmail(email, config);
      console.log(response);
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
