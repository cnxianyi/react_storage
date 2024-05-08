import axios from "axios";
import { getToken, removeToken } from "@/utils";
import { setClearUser } from "@/store/user/index";
import { router } from "@/router";
// axios 的封装
const request = axios.create({
  baseURL: "http://localhost:3098",
  timeout: 5000
})

request.interceptors.request.use( (config)=>{ // 请求拦截

  const token = getToken()
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
} , (error)=>{
  return Promise.reject(error)
})

request.interceptors.response.use( (res)=>{ // 响应拦截
  return res.data
} , (error)=>{
  if(error.response.status === 401){
    removeToken()
    router.navigate('/login').then( ()=>{
      window.location.reload()
    })
  }
  return Promise.reject(error)
})

export {request} 