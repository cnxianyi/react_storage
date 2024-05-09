import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, CloudServerOutlined, UserOutlined, GithubOutlined } from '@ant-design/icons';

const itemLeft = [
  {
    label: 'XIANYI_STORAGE',
    key: 'Home',
  },
  {
    label: 'Dashboard',
    key: 'app2',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Monitor',
    key: 'app',
    icon: <CloudServerOutlined />,
  }
];

const itemRight = [
  {
    label: 'User',
    key: 'app1',
    icon: <UserOutlined />,
  }
];

const TopBar = () => {
  const [current, setCurrent] = useState('Home');

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div style={{zIndex: 9999}}>
    <Menu onClick={handleClick} style={{float: "left"}} selectedKeys={[current]} mode="horizontal">
      {itemLeft.map(item => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
    <Menu onClick={handleClick} style={{float: "right"}} selectedKeys={[current]} mode="horizontal">
      {itemRight.map(item => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
    </div>
  );
};

export default TopBar;
