import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api/axios";

// Types based on OpenAPI
type TokenResponse = { access_token: string; token_type: string };

export type AuthState = {
  access_token: string | null;
  tokenType: string | null;
  user: { email?: string; username?: string } | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  access_token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  tokenType:
    typeof window !== "undefined" ? localStorage.getItem("token_type") : null,
  user: null,
  loading: false,
  error: null,
};

// Register user: POST /auth/ with JSON body { email, username, hashed_password, auth_provider? }
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      email,
      username,
      password,
      auth_provider = "local",
    }: {
      email: string;
      username: string;
      password: string;
      auth_provider?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/", {
        email,
        username,
        hashed_password: password,
        auth_provider,
      });
      // API returns created user object (schema unspecified). We'll assume 201 Created with user fields.
      return res.data as { email?: string; username?: string };
    } catch (err: unknown) {
      const e = err as {
        response?: { data?: { detail?: string } } | undefined;
        message?: string;
      };
      const message =
        e?.response?.data?.detail || e?.message || "Register failed";
      return rejectWithValue(message);
    }
  }
);

// Login: POST /auth/token with x-www-form-urlencoded { username, password }
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.set("username", username);
      params.set("password", password);
      const res = await api.post<TokenResponse>("/auth/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return res.data;
    } catch (err: unknown) {
      const e = err as {
        response?: { data?: { detail?: string } } | undefined;
        message?: string;
      };
      const message = e?.response?.data?.detail || e?.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// Fetch current user (requires valid bearer token)
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/");
      return res.data as { email?: string; username?: string };
    } catch (err: unknown) {
      const e = err as {
        response?: { status?: number; data?: { detail?: string } };
        message?: string;
      };
      if (e?.response?.status === 401) {
        return rejectWithValue("unauthorized");
      }
      return rejectWithValue(
        e?.response?.data?.detail || e?.message || "Fetch user failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.access_token = null;
      state.tokenType = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
      }
    },
    setUser(
      state,
      action: PayloadAction<{ email?: string; username?: string }>
    ) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Register failed";
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access_token = action.payload.access_token;
        state.tokenType = action.payload.token_type;
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", action.payload.access_token);
          localStorage.setItem("token_type", action.payload.token_type);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Login failed";
      })
      // fetchUser
      .addCase(fetchUser.pending, () => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.payload === "unauthorized") {
          state.access_token = null;
          state.tokenType = null;
          state.user = null;
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
          }
        } else {
          state.error = (action.payload as string) || state.error;
        }
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
