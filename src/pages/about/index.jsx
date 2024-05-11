import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <Title level={2}>关于文件管理系统</Title>
      <Paragraph>
        文件管理系统是一个基于 React 前端和 Node.js 后端的项目，旨在提供一个安全、可靠的文件管理和用户认证解决方案。通过前后端分离的架构，实现了用户注册、登录、文件上传、下载等功能，为用户提供了一个便捷的文件管理和分享平台。
      </Paragraph>
      <Paragraph>
        我们致力于不断优化和完善系统功能，提升用户体验，欢迎您的使用和反馈！
      </Paragraph>
      <Divider />
      <Paragraph>
        {/* 可以在这里添加其他关于项目的说明或链接 */}
      </Paragraph>
    </div>
  );
}

export default AboutPage;
