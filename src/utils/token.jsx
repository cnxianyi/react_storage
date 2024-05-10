const KEY = 'token'

function setToken (token){
  localStorage.setItem(KEY , token)
}

function getToken (){
  return localStorage.getItem(KEY)
}

function removeToken (){
  localStorage.removeItem(KEY)
}

export {
  setToken,
  getToken,
  removeToken
}

