import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/ApiService";

interface FetchPlansArgs {
    countryId?: string;
}

export const fetchPlans = createAsyncThunk(
    "plans/fetchPlans",
    async ({ countryId }: FetchPlansArgs = {}, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res = await api<{ success: boolean; data: any[] }, { countryId?: string }>({
                url: "/user/plans",
                method: "GET",
                params: { countryId: countryId || "all" }, // ✅ pass as object
            });

            // console.log("---- response in the fetching plans ----", res);
            return res?.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.message || "Failed to fetch plans");
        }
    }
);

export const featurePlans = createAsyncThunk(
    "plans/featurePlans",
    async (_, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res = await api<{ success: boolean; data: any[] }, { countryId?: string }>({
                url: "/user/plans/feature",
                method: "GET",
            });

            // console.log("---- response in the fetching feature plans ----", res);

            return res.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch plans");
        }
    }
);
