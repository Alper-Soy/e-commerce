import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    // console.log('click', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Item key='home' icon={<AppstoreOutlined />}>
          HOME
        </Item>

        <Item
          className='float-right'
          key='register'
          icon={<UserAddOutlined />}
        >
          Register
        </Item>

        <Item className='float-right' key='login' icon={<UserOutlined />}>
          Login
        </Item>

        <SubMenu icon={<SettingOutlined />} title='Username'>
          <Item key='setting:1'>Option 1</Item>
          <Item key='setting:2'>Option 2</Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default Header;
