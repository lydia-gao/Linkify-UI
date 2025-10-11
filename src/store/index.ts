import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import linkReducer from "@/store/slices/linkSlice";

// Import reducers here as we add slices
// Example: import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    link: linkReducer,
  },
  // Enable Redux DevTools in development by default
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
