// store/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/ApiService";

// Types
interface OrderState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    esims: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eSimDetails: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    esims: [],
    eSimDetails: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchSimsByUser = createAsyncThunk(
    "orders/fetchSimsByUser",
    async (_, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = await api<{ message: string; status: string; data: any[] }>({
                url: "/user/e-sim", // replace with your backend route
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

export const fetchSimDetailsByUser = createAsyncThunk(
    "orders/fetchSimDetailsByUser",
    async (simId: string, { rejectWithValue }) => {
        try {

            // console.log("---- order id in the details ----", orderId);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = await api<{ message: string; status: string; data: any }>({
                url: `/user/e-sim/${simId}`, // replace with your backend route
                method: "GET",
            });
            console.log("---- data in the e-sim details ----", data);
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
        clearESimDetails(state) {
            state.eSimDetails = null;
            state.error = null;
        },
        clearESims(state) {
            state.esims = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Orders
        builder.addCase(fetchSimsByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            fetchSimsByUser.fulfilled,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.esims = action.payload;
            }
        );
        builder.addCase(fetchSimsByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch Order Details
        builder.addCase(fetchSimDetailsByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            fetchSimDetailsByUser.fulfilled,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.eSimDetails = action.payload;
            }
        );
        builder.addCase(fetchSimDetailsByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearESimDetails, clearESims } = orderSlice.actions;
export default orderSlice.reducer;
