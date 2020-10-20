import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { createOrUpdateUser } from '../../api/auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState('alpersoy89@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    {
      user && user.token && history.push('/');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      const res = await createOrUpdateUser(idTokenResult.token);

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

      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      const res = await createOrUpdateUser(idTokenResult.token);

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

      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loginForm = () => (
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

      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        type='primary'
        shape='round'
        className='mb-3'
        block
        size='large'
        icon={<MailOutlined />}
        disabled={!email || password.length < 6}
        onClick={handleSubmit}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  const googleLoginButton = () => (
    <Button
      type='danger'
      shape='round'
      className='mb-3 primary'
      block
      size='large'
      icon={<GoogleOutlined />}
      onClick={googleLogin}
    >
      Login with Google
    </Button>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? <h4 className='text-info'>Loading...</h4> : <h4>Login</h4>}
          {loginForm()}
          {googleLoginButton()}
          <Link
            className='float-right  text-primary font-weight-bold'
            to='/forgot/password'
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
