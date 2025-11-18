// src/redux/slices/countrySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCountries } from "../thunk/thunk";
import { api } from "../../utils/ApiService";

// Define state type
interface CountryState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    countries: any;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
};

// Slice
const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        // you can add extra reducers if needed later (like reset state, etc.)
        clearCountries(state) {
            state.countries = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCountries.fulfilled,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (state, action: any) => {
                    state.loading = false;
                    state.countries = action.payload;
                }
            )
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) || "Failed to fetch countries";
            });
    },
});

// Export actions + reducer
export const { clearCountries } = countrySlice.actions;
export default countrySlice.reducer;
