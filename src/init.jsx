import { useEffect } from "react";
import { fetchUserInfo } from "./store/user";
import React from 'react';
import { useDispatch } from "react-redux";
import { _notice } from "./utils";
import dayjs from "dayjs";

export default function Init(){
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo()).then( (res)=>{
        if(res && res.data.vip == 0){
          _notice(<>欢迎您 {res.data.nickname}<br/><small>上次访问: {dayjs(res.data.last_login).format("MM/DD:HH:mm")}</small> </>)
        }
    })
	}, []);
  return <small style={{position: "fixed" , bottom: 2, left: 2,}}>XIANYI_STORAGE Version 1.0.1</small>
}