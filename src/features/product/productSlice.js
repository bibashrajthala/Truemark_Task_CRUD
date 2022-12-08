import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, API_THUNK) => {
    try {
      const response = await fetch(`products.json`);
      const res = await response.json();
      // console.log(res);
      const data = await res.data;
      return data;
    } catch (error) {
      // console.log(error);
      return API_THUNK.rejectWithValue("Something Went Wrong");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // console.log(action.payload);
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      // console.log(action.payload);
      const { id, formData } = action.payload;

      state.products = state.products.map((product) =>
        product.id === id ? formData : product
      );
    },
    deleteProduct: (state, action) => {
      // console.log(action.payload);
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;

export default productSlice;
