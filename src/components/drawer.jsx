import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import './drawer.scss'
import { useEffect } from 'react';
const _Drawer = ({open , url}) => {


  const [_open, setOpen] = useState(false);
  useEffect(()=>{
    if(open){
      setOpen(false); // true
    }
    console.log(url);
  }, [open])
  const onClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Drawer title="上传完成" width={"80%"} onClose={onClose} open={_open}>
          <img src={url} alt="" />
      </Drawer>
    </>
  );
};
export default _Drawer;