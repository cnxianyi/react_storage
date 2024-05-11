import { request , _notice, getToken } from "@/utils";
import { message } from "antd";

export function loginAPI(data) {
  return request({
    method: "POST",
    data: data,
    url: "users/login"
  }).then((res) => {
    _notice(res.message);
    return res; // 返回响应数据
  }).catch((error) => {
    //_notice(error.response.data.message, "error");
    throw error; // 这里抛出错误
  });
}

export function registerAPI(data) {
  return request({
    method: "POST",
    data: data,
    url: "users/register"
  }).then((res) => {
    _notice(res.message);
    return res.data; // 返回响应数据
  }).catch((error) => {
    _notice(error.response.data.message , "error");
    return {}
  });
}

export function getUserInfo() {
  return request({
    method: "POST",
    url: "users/info",
  }).then((res) => {
    return res; // 返回响应数据
  })
}

export function editPassword(data) {
  return request({
    method: "POST",
    url: "users/edit/password",
    data: data
  }).then((res) => {
    return res; // 返回响应数据
  })
}