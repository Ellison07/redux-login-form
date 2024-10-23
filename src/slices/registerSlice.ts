/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterType } from "../types/RegisterType";
import axios from "axios";

interface RegisterState {
  email: string;
  password: string;
  confirmPassword: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: RegisterState = {
  email: "",
  password: "",
  confirmPassword: "",
  status: "idle",
  error: null,
};
export const registerUser = createAsyncThunk(
  "registerUser",
  async (registerData: RegisterType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.19:4004/auth/register",
        registerData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Server error: ", error.response.data);
        return rejectWithValue(
          error.response.data.message || "Registration failed"
        );
      } else if (error.request) {
        console.error("No response received: ", error.request);
        return rejectWithValue(
          "No response from server. Please check your network."
        );
      } else {
        console.error("Error: ", error.message);
        return rejectWithValue(error.message || "Registration failed");
      }
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default registerSlice.reducer;
