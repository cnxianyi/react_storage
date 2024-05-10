import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, getUserInfo } from "@/apis/user";
import { request, setToken, getToken, removeToken } from "@/utils";

const userStore = createSlice({
	name: "user",
	initialState: {
		userInfo: {
			id: 0,
		}, // 将 userInfo 改为对象
	},
	reducers: {
		setUserInfo(state, action) {
			console.log("action:", action);
			if (action.payload.data.token) {
				setToken(action.payload.token);
			} else if (action.payload.token) {
				setToken(action.payload.token);
			}
			state.userInfo = action.payload.data;
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
		const token = getToken();
		if (token) {
			const res = await getUserInfo();
			dispatch(dispatch(setUserInfo(res)));
			return res;
		}
	};
}

export { setUserInfo, setClearUser, fetchLogin, fetchUserInfo, fetchRegister };
export default userReducer;
