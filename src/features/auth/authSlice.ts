import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      "https://dummyjson.com/auth/login",
      userCredentials
    );
    const response = await request.data.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  user: any;
  error: any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Invalid request. Please check your input.";
        } else if (
          action.error.message === "Request failed with status code 400"
        ) {
          state.error = "Incorrect username or password.";
        } else {
          state.error = action.error.message;
        }
      });
  },
});
export const { logout } = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export default authSlice.reducer;
