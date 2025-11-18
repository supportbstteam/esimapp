// store/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/ApiService";
import Toast from "react-native-toast-message";
import { ToastAndroid } from "react-native";

// Types
export interface Plan {
    id: string;
    name: string;
    price: number;
    validityDays: number;
}

export interface CartItem {
    id: string;
    plan: Plan;
    quantity: number;
}

export interface Cart {
    id: string;
    user: { id: string };
    items: CartItem[];
    isCheckedOut: boolean;
}

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
};

// Async Thunks
export const fetchCart = createAsyncThunk<Cart>(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const data = await api<{ cart: Cart }>({ url: "/user/add-to-cart/", method: "GET" });
            // console.log("----- data in teh fetch cart -----", data);
            return data.cart;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const addToCart = createAsyncThunk<Cart, { planId: string; quantity?: number, id: string }[]>(
    "cart/addToCart",
    async (plans, { rejectWithValue }) => {

        // console.log("----- plans in add to cart ----", plans);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = await api({
                url: "/user/add-to-cart/create",
                method: "POST",
                data: { plans }, // 🔹 wrap in object to match backend
            });

            console.log("---- response int the add to cart ----", data);
            return data.cart;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateCartItem = createAsyncThunk<CartItem, { cartItemId: string; quantity: number }>(
    "cart/updateCartItem",
    async ({ cartItemId, quantity }, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = await api({
                url: `/user/add-to-cart/update/${cartItemId}`,
                method: "PUT",
                data: { quantity }, // ❌ TypeScript thinks { quantity } !== { cartItem: CartItem }
            });

            // console.log("----- response in the update cart items -----", data);
            ToastAndroid.show("Cart Updated!", ToastAndroid.SHORT);

            return data.cartItem;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);


export const removeCartItem = createAsyncThunk<
  string, // ✅ Return type
  string  // ✅ Argument type (cartItemId)
>(
  "cart/removeCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await api<{ message: string }>({
        url: `/user/add-to-cart/delete/${cartItemId}`,
        method: "DELETE",
      });

      console.log("✅ Item deleted:", response);

      // Return a string message (TypeScript expects string)
      return response.message;
    } catch (err: any) {
      console.log("❌ Delete failed:", {
        status: err?.response?.status,
        data: err?.response?.data,
      });

      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);



// Slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Cart
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
            state.loading = false;
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.addCase(fetchCart.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Add to Cart
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload; // replaces cart with updated one
            state.loading = false;
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Cart Item
        builder.addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
            if (!state.cart) return;
            const index = state.cart.items.findIndex((i) => i.id === action.payload.id);
            if (index !== -1) state.cart.items[index] = action.payload;
        });

        // Remove Cart Item
        builder.addCase(removeCartItem.fulfilled, (state, action: PayloadAction<string>) => {
            if (!state.cart) return;
            state.cart.items = state.cart.items.filter((i) => i.id !== action.payload);
        });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
