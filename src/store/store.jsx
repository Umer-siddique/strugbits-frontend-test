import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "../services/ordersApi";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersApi.middleware);
  },
});
