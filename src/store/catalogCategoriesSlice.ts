import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalogApi, ApiCategory } from "@/api/catalog";

interface CatalogCategoriesState {
  categories: ApiCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CatalogCategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "catalogCategories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await catalogApi.getCategories();
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al cargar categorías");
    }
  }
);

const catalogCategoriesSlice = createSlice({
  name: "catalogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default catalogCategoriesSlice.reducer;
