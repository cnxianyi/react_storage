import axios from "axios";
import { getToken, removeToken } from "@/utils";
import { setClearUser } from "@/store/user/index";
import { router } from "@/router";
import { _notice } from "@/utils";
// axios 的封装
const request = axios.create({
  baseURL: "http://localhost:3098/api",
  timeout: 5000
})

const interceptURLs = ['users/info' , 'files/list' , 'files/delete'];

request.interceptors.request.use(
  (config) => {
    // 检查请求的 URL，只对数组中指定的 URL 添加 token
    if (interceptURLs.includes(config.url)) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => { // 响应拦截
    return res.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      _notice("会话已过期，即将跳转到登录界面" , "error")
      removeToken();
      setTimeout(() => {
        router.navigate('/login').then(() => {
          window.location.reload();
        });
      }, 2000);
    }else if(error.response){
      _notice(<>{error.response.data.error}</> , "error")
    }


    return Promise.reject(error);
  }
);

export {request} 