import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { createOrUpdateUser } from '../../api/auth';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   {
  //     user && user.token && history.push('/');
  //   }
  // }, [user]);

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log('user', user, 'idTokenResult', idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
