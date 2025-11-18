// store/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/ApiService";

// Types
interface OrderState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orders: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderDetails: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchOrdersByUser = createAsyncThunk(
    "orders/fetchOrdersByUser",
    async (_, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = await api<{ message: string; status: string; data: any[] }>({
                url: "/user/order-list", // replace with your backend route
                method: "GET",
            });
            // console.log("---- data in the order List ----", data);
            return data?.status === "success" ? data.data : [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchOrderDetailsByUser = createAsyncThunk(
    "orders/fetchOrderDetailsByUser",
    async (orderId: string, { rejectWithValue }) => {
        try {

            console.log("---- order id in the details ----", orderId);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = await api<{ message: string; status: string; data: any }>({
                url: `/user/order-details/${orderId}`, // replace with your backend route
                method: "GET",
            });
            // console.log("---- data in the order details ----", data);
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Slice
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrderDetails(state) {
            state.orderDetails = null;
            state.error = null;
        },
        clearOrders(state) {
            state.orders = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Orders
        builder.addCase(fetchOrdersByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            fetchOrdersByUser.fulfilled,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.orders = action.payload;
            }
        );
        builder.addCase(fetchOrdersByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch Order Details
        builder.addCase(fetchOrderDetailsByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            fetchOrderDetailsByUser.fulfilled,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.orderDetails = action.payload;
            }
        );
        builder.addCase(fetchOrderDetailsByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearOrderDetails, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
