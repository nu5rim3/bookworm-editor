import axiosInstance from "@/lib/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  otpStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  status: "idle",
  otpStatus: "idle",
};

interface Credentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface ConfirmOtp {
  email: string;
  code: string;
}

export const login = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  Credentials,
  { rejectValue: string }
>("auth/signin", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<{ token: string; user: User }>(
      "/auth/signin",
      credentials
    );
    return response.data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = err as any;
    if (error.response.status !== 200) {
      return rejectWithValue(error.response.data?.message || "Failed to login");
    } else {
      return rejectWithValue(
        error.response.data?.message || error.message || "Failed to login"
      );
    }
  }
});

export const register = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  RegisterCredentials,
  { rejectValue: string }
>("auth/signup", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<{ token: string; user: User }>(
      "/auth/signup",
      credentials
    );
    return response.data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = err as any;
    if (error.response.status !== 200) {
      return rejectWithValue(
        error.response.data?.message || "Failed to register"
      );
    } else {
      return rejectWithValue(
        error.response.data?.message || error.message || "Failed to register"
      );
    }
  }
});

export const confirmOtp = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ConfirmOtp,
  { rejectValue: string }
>("auth/confirmOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<{
      email: string;
      code: string;
    }>("/auth/confirm-otp", data);
    return response.data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = err as any;
    if (error.response.status !== 200) {
      return rejectWithValue(
        error.response.data?.message || "Failed to validated"
      );
    } else {
      return rejectWithValue(
        error.response.data?.message || error.message || "Failed to validated"
      );
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        console.log("[ACTION] - ", action.payload);
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to login";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to register";
      })
      .addCase(confirmOtp.pending, (state) => {
        state.otpStatus = "loading";
      })
      .addCase(confirmOtp.fulfilled, (state, action) => {
        console.log("[first]", action.payload);
        state.otpStatus = "succeeded";
        state.error = null;
      })
      .addCase(confirmOtp.rejected, (state, action) => {
        state.otpStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to confirm OTP";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
