import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../lib/api/axios";

export type CodeType = "none" | "qrcode" | "barcode";

export interface CreateLinkPayload {
  codeType: CodeType;
  original_url: string;
  title?: string;
  description?: string;
  alias?: string;
}

export interface LinkState {
  loading: boolean;
  error: string | null;
  result: unknown;
}

const initialState: LinkState = {
  loading: false,
  error: null,
  result: null,
};

export const createLink = createAsyncThunk(
  "link/createLink",
  async (payload: CreateLinkPayload, { rejectWithValue }) => {
    try {
      let url = "";
      const data: Record<string, unknown> = {
        original_url: payload.original_url,
        title: payload.title,
        description: payload.description,
      };
      if (payload.codeType === "none") {
        url = "/shorturls/";
        if (payload.alias) data.alias = payload.alias;
      } else if (payload.codeType === "qrcode") {
        url = "/qrcodes/";
      } else if (payload.codeType === "barcode") {
        url = "/barcodes/";
      }
      const response = await axios.post(url, data);
      return response.data;
    } catch (err: unknown) {
      interface AxiosError {
        response?: {
          data?: {
            detail?: string;
          };
        };
        message?: string;
      }
      const error = err as AxiosError;
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response
      ) {
        return rejectWithValue(
          error.response.data?.detail || String(error.message)
        );
      }
      return rejectWithValue((error as Error).message);
    }
  }
);

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    resetResult(state) {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetResult } = linkSlice.actions;
export default linkSlice.reducer;
