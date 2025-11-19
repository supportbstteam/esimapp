import axios, { AxiosRequestConfig, AxiosError, Method } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ApiOptions<T = unknown, P = unknown> extends AxiosRequestConfig {
  method?: Method;  // default: GET
  url: string;
  data?: T;         // request body type
  params?: P;       // query params type
  isAuth?: boolean; // default: true
}

const axiosInstance = axios.create({
  // baseURL: "https://esim-backend-three.vercel.app/api",
  // baseURL: "https://esim-backend-w7ox.onrender.com/api",
  baseURL: "http://192.168.29.160:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function api<T = unknown, P = unknown>({
  url,
  method = "GET",
  data,
  params,
  isAuth = true,
  ...rest
}: ApiOptions<T, P>): Promise<T> {
  try {
    const headers: Record<string, string> = {};

    // Attach JWT if available
    if (isAuth) {
      const token = await AsyncStorage.getItem("token");
      // console.log("------ token ----",token);
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axiosInstance({
      url,
      method,
      headers,
      params,
      ...(method.toUpperCase() !== "GET" && { data }),
      ...rest,
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Example: Log or handle based on status
    // You can show Toast messages or handle session expiry
    // if (error.response?.status === 401) {
    //   Toast.show({ text1: "Session expired. Please log in again." });
    // }

    throw error; // re-throw for Redux or global handler
  }
}
