import { request , _notice, getToken } from "@/utils";

export function getFilesList() {
  return request({
    method: "POST",
    url: "files/list",
  }).then((res) => {
    return res; // 返回响应数据
  }).catch((error)=>{
    _notice(`${error}` , "error")
    return
  })
}

export function deleteFile(data) {
  return request({
    method: "POST",
    url: "files/delete",
    data: data
  }).then((res) => {
    return res; // 返回响应数据
  }).catch((error)=>{
    _notice(`${error}` , "error")
    return
  })
}
