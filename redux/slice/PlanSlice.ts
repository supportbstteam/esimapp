// src/redux/slices/planSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPlans, featurePlans } from "../thunk/planThunk";

export interface Plan {
  id: string;
  title: string;
  name: string;
  data: number;
  call: number;
  sms: number;
  isUnlimited: boolean;
  validityDays: number;
  isFeatured: boolean;
  price: string;
  currency: string;
  planId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  country: any;
  countryId: any;
  createdAt: string;
  updatedAt: string;
}

interface PlanState {
  plans: Plan[];
  featured: Plan[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],
  featured: [],
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    clearPlans(state) {
      state.plans = [];
      state.featured = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action: PayloadAction<Plan[]>) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })
      .addCase(featurePlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featurePlans.fulfilled, (state, action: PayloadAction<Plan[]>) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(featurePlans.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export const { clearPlans } = planSlice.actions;
export default planSlice.reducer;
