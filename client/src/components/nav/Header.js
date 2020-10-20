import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    // console.log('click', e);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>HOME </Link>
      </Item>

      {!user && (
        <Item className='float-right' key='register' icon={<UserAddOutlined />}>
          <Link to='/register'>Register </Link>
        </Item>
      )}

      {!user && (
        <Item className='float-right' key='login' icon={<UserOutlined />}>
          <Link to='/login'>Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          className='float-right'
          icon={<SettingOutlined />}
          title={user.name}
        >
          <Item key='setting:1'>Option 1</Item>
          <Item key='setting:2'>Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
