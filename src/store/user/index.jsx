import { createSlice } from "@reduxjs/toolkit";
import { loginAPI , registerAPI } from "@/apis/user";
import { request , setToken as _setToken , getToken , removeToken } from "@/utils";

const userStore = createSlice({
  name: 'user',
  initialState: {
    token:  '',//getToken() || '',
    userInfo: {} // 将 userInfo 改为对象
  },
  reducers: {
    setToken(state , action){
      state.token = action.payload
      // 存入LocalStorage
      _setToken(action.payload)
    },
    setUserInfo(state , action){
      state.userInfo = action.payload
    },
    setClearUser(state){
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

const {setToken , setUserInfo , setClearUser} = userStore.actions

const userReducer = userStore.reducer

// 异步方法

function fetchLogin(loginForm){
  return async (dispatch)=>{
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token)) // 同步存入token
  }
}

function fetchUserInfo(){
  return async (dispatch)=>{
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data)) // 同步存入token
  }
}

export {setToken , setUserInfo , setClearUser , fetchLogin , fetchUserInfo}
export default userReducer
