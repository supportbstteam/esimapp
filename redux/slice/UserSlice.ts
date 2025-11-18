import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { api } from "../../utils/ApiService";

// =====================
// Types
// =====================
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string | null;
  role: "admin" | "user";
  phone: string;
  country: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
  sims?: any[];
  createdAt?: string;
  updatedAt?: string;
  profilePic?: string;
  image?: string;
}

interface UserState {
  user: User | null;
  isAuth: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// =====================
// Initial State
// =====================
const initialState: UserState = {
  user: null,
  isAuth: false,
  token: null, // AsyncStorage will be read later
  loading: false,
  error: null,
};

// =====================
// Async Thunks
// =====================

// Signup
export const signupUser = createAsyncThunk<
  { user: User; token: string },
  { firstName: string; lastName: string; email: string; password: string }
>("user/signup", async (payload, { rejectWithValue }) => {


  // console.log("------ payload -----", payload);
  try {
    const res: any = await api({
      method: "POST",
      url: "/user/verify-otp",
      data: payload,
    });

    console.log("------ sign up -----", res);

    // ✅ Save token immediately
    if (res?.token) {
      await AsyncStorage.setItem("token", res.token);
    }

    return { user: res.data, token: res.token };
  } catch (err: any) {
    console.error("----- error in the sign up ----", err)
    const message = err.response?.data?.message || err.message;
    Toast.show({ type: "error", text1: message });
    return rejectWithValue(message);
  }
});

// Login
export const loginUser = createAsyncThunk<{ user: User; token: string }, { email: string; password: string }>("user/login", async (payload, { rejectWithValue }) => {
  try {
    const res: any = await api({
      method: "POST",
      url: "/user/login",
      data: payload,
    });

    // console.log("----- response ----", res);

    if (res?.token) {
      await AsyncStorage.setItem("token", res.token);
    }



    return { user: res.data, token: res.token };
  } catch (err: any) {
    const message = err.response?.data?.message || err.message;
    Toast.show({ type: "error", text1: message });
    return rejectWithValue(message);
  }
});

// Fetch user details
export const fetchUserDetails = createAsyncThunk<User, void>(
  "user/fetchDetails",
  async (_, { rejectWithValue }: any) => {
    try {
      const token = await AsyncStorage.getItem("token");


      // console.log("----- token ------",token);
      if (!token) throw new Error("No token found");

      // const res = await axios.get(
      //   "https://esim-backend-three.vercel.app/api/user/details",
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );

      const res = await api({
        method: "GET",
        url: "user/details"
      });

      // console.log("---- user details ----", res);

      return res;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      // console.error("Error fetching user details:", message);
      console.error("Error fetching user details:", err);
      return rejectWithValue(message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk<
  { user: User; token: string },
  { email: string; otp: string }
>("user/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const res: any = await api({
      method: "POST",
      url: "/user/signup",
      data: payload,
    });

    console.log('====================================');
    console.log("-----",res);
    console.log('====================================');

    if (res?.data?.token) {
      // console.log("------ token -----", res?.data?.token);
      await AsyncStorage.setItem("token", res?.data?.token);
    }

    return { user: res.data, token: res.data?.token };
  } catch (err: any) {
    const message = err.response?.data?.message || err.message;
    Toast.show({ type: "error", text1: message });
    return rejectWithValue(message);
  }
});

// =====================
// Slice
// =====================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.error = null;
      AsyncStorage.removeItem("token"); // ✅ clean logout
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuth = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // --- Signup ---
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // state.isAuth = true;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // --- Login ---
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // --- Fetch Details ---
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // --- Verify OTP ---
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {

      // console.log("----- action.payload.user -----",action.payload.user);
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout, setToken } = userSlice.actions;
export default userSlice.reducer;
