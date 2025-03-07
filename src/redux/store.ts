// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/auth/authSlice";
// import storage from "redux-persist/lib/storage";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { baseApi } from "./api/baseApi";

// export const rootReducer = combineReducers({
//   [baseApi.reducerPath]: baseApi.reducer,
//   auth: authReducer,
//   //   cart: cartReducer,
// });

// const persistConfig = {
//   key: "auth",
//   storage,
// };

// // const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   // reducer: {
//   //   [baseApi.reducerPath]: baseApi.reducer,
//   //   auth: persistedAuthReducer,
//   //   cart: cartReducer,
//   // },
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddlewares) =>
//     getDefaultMiddlewares({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(baseApi.middleware),
// });

// // Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
// export type AppStore = typeof store;

// export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import cartReducer from "./features/cart/cartSlice";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./features/cart/cartSlice";
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "./storage";
// import { baseApi } from "./api/baseApi";

// //! We will not do this
// //! This is a global variable so we will avoid this
// // const store = configureStore({});

// const persistOptions = {
//   key: "cart",
//   storage,
// };

// const persistedCart = persistReducer(persistOptions, cartReducer);

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       cart: cartReducer,
//     },
//     middleware: (getDefaultMiddlewares: any) =>
//       getDefaultMiddlewares({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(baseApi.middleware),
//   });
// };

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
