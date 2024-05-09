import { request , _notice } from "@/utils";

export function loginAPI(data){
  return request({
    method: "POST",
    data: data,
    url: "users/login"
  }).then((res) => {
    _notice(res.message);
    return res.data; // 返回响应数据
  }).catch((error) => {
    _notice(error.response.data.message , "error");
    return {}
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

export function getUserFilesAPI(data) {
  return request({
    method: "POST",
    url: "uploads/list"
  }).then((res) => {
    return res.data; // 返回响应数据
  }).catch((error) => {
    _notice(error.response.data.message , "error");
    return {}
  });
}
