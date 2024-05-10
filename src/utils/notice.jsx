import {
  notification,
} from "antd";

export const notice = (msg , type='success')=>{
  if(type == 'success'){
    notification.success({
      message: msg,
      duration: 2,
    });
  }else if(type == 'error'){
    notification.error({
      message: msg,
      duration: 5,
    });
  }
};