import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "@/apis/user";
import { request, setToken, getToken, removeToken } from "@/utils";

const userStore = createSlice({
	name: "user",
	initialState: {
		userInfo: {}, // 将 userInfo 改为对象
	},
	reducers: {
		setUserInfo(state, action) {
			state.userInfo = action.payload.data;
      setToken(action.payload.token)
		},
		setClearUser(state) {
			state.token = "";
			state.userInfo = {};
			removeToken();
		},
	},
});

const { setUserInfo, setClearUser } = userStore.actions;

const userReducer = userStore.reducer;

// 异步方法

function fetchRegister(data) {
  return async (dispatch) => {
      // 发起注册请求
      const response = await registerAPI(data);
  };
}

function fetchLogin(loginForm) {
	return async (dispatch) => {
		const res = await loginAPI(loginForm);
		dispatch(dispatch(setUserInfo(res))); // 同步存入token
	};
}

function fetchUserInfo() {
	return async (dispatch) => {
		const res = await dispatch(setUserInfo(res.data)); // 同步存入token
	};
}

export {
	setUserInfo,
	setClearUser,
	fetchLogin,
	fetchUserInfo,
	fetchRegister,
};
export default userReducer;
