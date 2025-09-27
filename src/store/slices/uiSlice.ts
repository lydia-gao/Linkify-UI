import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  notifications: Notification[];
  categoriesOpen: boolean;
  dateRange: {
    start: string;
    end: string;
  };
  selectedTimeframe: "weekly" | "monthly" | "yearly";
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: "light",
  notifications: [],
  categoriesOpen: false,
  dateRange: {
    start: "2022-02-16",
    end: "2022-02-20",
  },
  selectedTimeframe: "monthly",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id">>
    ) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleCategories: (state) => {
      state.categoriesOpen = !state.categoriesOpen;
    },
    setCategoriesOpen: (state, action: PayloadAction<boolean>) => {
      state.categoriesOpen = action.payload;
    },
    setDateRange: (
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      state.dateRange = action.payload;
    },
    setTimeframe: (
      state,
      action: PayloadAction<"weekly" | "monthly" | "yearly">
    ) => {
      state.selectedTimeframe = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  toggleTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleCategories,
  setCategoriesOpen,
  setDateRange,
  setTimeframe,
} = uiSlice.actions;

export default uiSlice.reducer;
