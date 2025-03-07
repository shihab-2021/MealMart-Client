import { baseApi } from "./api/baseApi";
import cartReducer from "./features/cart/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartReducer,
};
