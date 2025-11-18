import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/ApiService";


const initialState = {
    loading: false,
    error: null,
    links: []
}

export const getAllLinks = createAsyncThunk(
    "link/getAllLinks",
    async (_, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await api({
                url: `/admin/social-media`,
                method: "GET",
            });

            // console.log("---- socials links ----", res);
            return res;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch testimonials");
        }
    }
);


const linkSlice = createSlice({
    name: "links",
    initialState,
    reducers: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extraReducers: (builder: any) => {
        builder
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(getAllLinks.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(getAllLinks.fulfilled, (state: any, action: any) => {

                // console.log("----- links action.payload ----",action.payload)
                state.loading = false;
                state.links = action.payload;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(getAllLinks.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// export const { clearTestimonial } = testimonialSlice.actions;
export default linkSlice.reducer;