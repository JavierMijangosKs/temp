import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slices/userSlice";
import { postReducer } from "./Slices/postSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
