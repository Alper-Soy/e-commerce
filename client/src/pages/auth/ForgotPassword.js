import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { forgotPasswordRedirect } from '../../config';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    user && user.token && history.push('/');
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: forgotPasswordRedirect,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log('ERROR MSG IN FORGOT PASSWORD', error);
      });
  };

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? (
        <h4 className='text-info'>Loading</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          placeholder='Type your email'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button className='btn btn-raised' disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
