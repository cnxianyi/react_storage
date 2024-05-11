import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
	AppstoreOutlined,
	CloudServerOutlined,
	UserOutlined,
} from "@ant-design/icons";
import "./topBar.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { _notice, removeToken } from "@/utils";
import { router } from "@/router";
import { message } from "antd";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [itemLeft , setItemLeft] = useImmer([])
  
  const itemRight = [
    {
      label: "XIANYI_STORAGE",
      key: "R1",
    },
  ]

  const userInfo = useSelector( state=>state.user.userInfo);

  useEffect(() => {
    if (userInfo.id === 0) {
      setItemLeft([
        {
          label: "登录",
          key: "L6",
          icon: <UserOutlined />,
        },
        {
          label: "Files",
          key: "L4",
          icon: <AppstoreOutlined />,
        },
        {
          label: "Monitor",
          key: "L5",
          icon: <CloudServerOutlined />,
        },
      ]);
    }else if (userInfo.nickname) {
      setItemLeft([
        {
          label: userInfo.nickname,
          key: "L7",
          icon: <UserOutlined />,
          children: [
            {
              label: "修改密码",
              key: "L1",
            },
            {
              label: "关于",
              key: "L2",
            },
            {
              label: "退出登录",
              key: "L3",
            },
          ],
        },
        {
          label: "Files",
          key: "L4",
          icon: <AppstoreOutlined />,
        },
        {
          label: "Monitor",
          key: "L5",
          icon: <CloudServerOutlined />,
        },
      ]);
    }
  }, [userInfo, setItemLeft]);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setCurrentRight("R1");
        setCurrentLeft("");
        break;
      case '/files':
        setCurrentLeft("L4");
        setCurrentRight("")
        break;
      case '/monitor':
        setCurrentLeft("L5");
        setCurrentRight("")
        break;
      default:
        console.log(location.pathname);
        break;
    }
  }, [location.pathname]);

	const [currentLeft, setCurrentLeft] = useState("/");
	const [currentRight, setCurrentRight] = useState("");

	const handleClickLeft = (e) => {
		setCurrentLeft(e.key);
    
    switch (e.key) {
      case "L1":
        navigate('/edit')
        break;
      case "L2":
        navigate('/about')
        break;
      case "L3":
        removeToken();
        message.open({
          type: 'success',
          content: '退出成功，即将跳转登录...',
        });
        setTimeout(() => {
          router.navigate('/login').then(() => {
            window.location.reload();
          });
        }, 1000);
        break;
      case "L4":
        navigate('/files')
        break;
      case "L5":
        navigate('/monitor')
        break;
      case "L6":
        navigate('/login')
        break;
      case "L7":
        navigate('/')
        break;
      default:
        break;
    }
	};

	const handleClickRight = (e) => {
		setCurrentRight(e.key);
    switch (e.key) {
      case "R1":
        navigate('/')
        break;
      default:
        break;
    }
	};

	return (
		<div className="bar">
			<Menu
				onClick={handleClickLeft}
				selectedKeys={[currentLeft]}
				mode="horizontal"
				items={itemLeft.map((item) => ({
					key: item.key,
					icon: item.icon,
					label: item.label,
          children: item.children
				}))}
			/>
			<Menu
				onClick={handleClickRight}
				className="right"
				selectedKeys={[currentRight]}
				mode="horizontal"
				items={itemRight}
			/>
		</div>
	);
};

export default React.memo(TopBar);
