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
