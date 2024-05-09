import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "@/apis/user";
import { request, setToken as _setToken, getToken, removeToken } from "@/utils";

const userStore = createSlice({
	name: "user",
	initialState: {
		token: "", //getToken() || '',
		userInfo: {}, // 将 userInfo 改为对象
	},
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
			// 存入LocalStorage
			_setToken(action.payload);
		},
		setUserInfo(state, action) {
			state.userInfo = action.payload;
		},
		setClearUser(state) {
			state.token = "";
			state.userInfo = {};
			removeToken();
		},
	},
});

const { setToken, setUserInfo, setClearUser } = userStore.actions;

const userReducer = userStore.reducer;

// 异步方法

function fetchRegister(data) {
  return async (dispatch) => {
      // 发起注册请求
      const response = await registerAPI(data);
      console.log(response);
      // 处理注册成功，将用户信息存入 store
      dispatch(setUserInfo(response)); // 假设 setUserInfo 是一个 action creator
  };
}

function fetchLogin(loginForm) {
	return async (dispatch) => {
		const res = await loginAPI(loginForm);
		dispatch(setToken(res.data.token)); // 同步存入token
	};
}

function fetchUserInfo() {
	return async (dispatch) => {
		const res = await dispatch(setUserInfo(res.data)); // 同步存入token
	};
}

export {
	setToken,
	setUserInfo,
	setClearUser,
	fetchLogin,
	fetchUserInfo,
	fetchRegister,
};
export default userReducer;
