import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalogApi, ApiProduct } from "@/api/catalog";

interface CatalogProductsState {
  products: ApiProduct[];
  currentProduct: ApiProduct | null;
  loading: boolean;
  error: string | null;
}

const initialState: CatalogProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "catalogProducts/fetch",
  async (categoryId: string | undefined, { rejectWithValue }) => {
    try {
      const { data } = await catalogApi.getProducts(categoryId);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al cargar productos");
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "catalogProducts/fetchOne",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await catalogApi.getProduct(id);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Producto no encontrado");
    }
  }
);

const catalogProductsSlice = createSlice({
  name: "catalogProducts",
  initialState,
  reducers: {
    clearCurrentProduct(state) {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProduct.fulfilled, (state, action) => { state.loading = false; state.currentProduct = action.payload; })
      .addCase(fetchProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { clearCurrentProduct } = catalogProductsSlice.actions;
export default catalogProductsSlice.reducer;
