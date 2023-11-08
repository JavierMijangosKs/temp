import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../config";

const initialState = {
  isLoggedIn: false,
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser } = userSlice.actions;

export const isLoggedInSel = (state) => state.user.isLoggedIn;
export const userSel = (state) => state.user.user;

export const login =
  ({ name, password }, onFail) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`${BASE_API}/users/login`, {
        name,
        password,
      });
      dispatch(setUser(data));
      dispatch(setIsLoggedIn(true));
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message;
      onFail(message || "Error");
    }
  };

export const userReducer = userSlice.reducer;
