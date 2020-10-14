import React, { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!password || password.length < 6) {
      toast.error(
        'Password is required and must be at least 6 characters long!'
      );
      return;
    }

    try {
      // Confirm the link is a sign-in with email link.
      if (auth.isSignInWithEmailLink(window.location.href)) {
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          toast.error('Please provide your email for confirmation');
          history.push('/register');
        }

        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );

        if (result.user.emailVerified) {
          window.localStorage.removeItem('emailForRegistration');

          // get user id token
          // => with currentUser we don't have to save current user in the local storage
          // => because firebase keep track of currently logged in user
          let user = auth.currentUser;
          await user.updatePassword(password);
          const idTokenResult = await user.getIdToken();

          // populate user to redux store
          console.log(`user: ${user}, idTokenResult: ${idTokenResult}`);

          // redirect
          history.push('/');
        }
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
