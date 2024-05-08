import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/user/index";

export default configureStore({
  reducer: {
    user: userReducer
  }
})