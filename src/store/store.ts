import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import catalogCategoriesReducer from "./catalogCategoriesSlice";
import catalogProductsReducer from "./catalogProductsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      catalogCategories: catalogCategoriesReducer,
      catalogProducts: catalogProductsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
