import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/ApiService";

export interface Faq {
    id: string;
    question: string;
    answer: string;
    order?: number;
}

interface FaqState {
    list: Faq[];
    loading: boolean;
    error: string | null;
}

const initialState: FaqState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchFaqs = createAsyncThunk("faq/fetchFaqs", async () => {
    const res = await api({ url: "/user/cms/faq", method: "GET", isAuth: false });
    return res;
});

const faqSlice = createSlice({
    name: "faq",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaqs.pending, (state) => {
                state.loading = true;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(fetchFaqs.fulfilled, (state:any, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchFaqs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch FAQs";
            });
    },
});

export default faqSlice.reducer;
