/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginType } from "../types/LoginType";
import axios from "axios";
interface LoginState {
  email: string;
  password: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: LoginState = {
  email: "",
  password: "",
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (loginData: LoginType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.1.19:4004/auth/login",
        loginData
      );
      return response.data;
    } catch (error: any) {
      alert("Login failed");
      return rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);
const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default loginSlice.reducer;
