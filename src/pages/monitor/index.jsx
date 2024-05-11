import React from 'react';
import { Card } from 'antd';
import './index.scss'

const Monitor = () => {
  return (
    <div className='contentIframe'>
        <iframe
          src="http://localhost:19999"
          className='card'
        ></iframe>
    </div>
  );
};

export default Monitor;