import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/ApiService";

export interface Testimonial {
    id: string;
    name: string;
    profession?: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

interface TestimonialState {
    testimonials: Testimonial[];
    loading: boolean;
    error: string | null;
}

const initialState: TestimonialState = {
    testimonials: [],
    loading: false,
    error: null,
};

// ✅ Get all testimonials
export const getAllTestimonials = createAsyncThunk(
    "testimonials/getAll",
    async (_, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await api({
                url: `/admin/testimonials`,
                method: "GET",
            });
            return res.testimonials || [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch testimonials");
        }
    }
);


const testimonialSlice = createSlice({
    name: "testimonials",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Get All
            .addCase(getAllTestimonials.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTestimonials.fulfilled, (state, action) => {
                state.loading = false;
                state.testimonials = action.payload;
            })
            .addCase(getAllTestimonials.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// export const { clearTestimonial } = testimonialSlice.actions;
export default testimonialSlice.reducer;
