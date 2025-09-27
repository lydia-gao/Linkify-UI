import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Link {
  id: string;
  title: string;
  originalUrl: string;
  shortUrl: string;
  description?: string;
  category?: string;
  ownerName?: string;
  expiration?: string;
  alias?: string;
  tags: string[];
  clicks: number;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QRCode {
  id: string;
  title: string;
  data: string;
  qrCodeUrl: string;
  clicks: number;
  createdAt: string;
}

export interface Barcode {
  id: string;
  title: string;
  data: string;
  barcodeUrl: string;
  clicks: number;
  createdAt: string;
}

export interface LinksState {
  links: Link[];
  qrCodes: QRCode[];
  barcodes: Barcode[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const initialState: LinksState = {
  links: [],
  qrCodes: [],
  barcodes: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
};

// Async thunks for API calls
export const fetchLinks = createAsyncThunk(
  "links/fetchLinks",
  async (
    params: { page?: number; limit?: number; category?: string },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.category) queryParams.append("category", params.category);

      const response = await fetch(`/api/links?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch links");

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch links"
      );
    }
  }
);

export const createLink = createAsyncThunk(
  "links/createLink",
  async (
    linkData: Omit<Link, "id" | "createdAt" | "updatedAt" | "clicks">,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(linkData),
      });

      if (!response.ok) throw new Error("Failed to create link");

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create link"
      );
    }
  }
);

export const updateLink = createAsyncThunk(
  "links/updateLink",
  async (
    { id, ...linkData }: Partial<Link> & { id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(linkData),
      });

      if (!response.ok) throw new Error("Failed to update link");

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update link"
      );
    }
  }
);

export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete link");

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete link"
      );
    }
  }
);

export const fetchStats = createAsyncThunk(
  "links/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/links/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch stats"
      );
    }
  }
);

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addLink: (state, action: PayloadAction<Link>) => {
      state.links.unshift(action.payload);
      state.totalCount += 1;
    },
    updateLinkInState: (state, action: PayloadAction<Link>) => {
      const index = state.links.findIndex(
        (link) => link.id === action.payload.id
      );
      if (index !== -1) {
        state.links[index] = action.payload;
      }
    },
    removeLink: (state, action: PayloadAction<string>) => {
      state.links = state.links.filter((link) => link.id !== action.payload);
      state.totalCount -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Links
      .addCase(fetchLinks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.links = action.payload.links;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Link
      .addCase(createLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.links.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Link
      .addCase(updateLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLink.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.links.findIndex(
          (link) => link.id === action.payload.id
        );
        if (index !== -1) {
          state.links[index] = action.payload;
        }
      })
      .addCase(updateLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Link
      .addCase(deleteLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.links = state.links.filter((link) => link.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Stats
      .addCase(fetchStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update stats in state if needed
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentPage,
  clearError,
  addLink,
  updateLinkInState,
  removeLink,
} = linksSlice.actions;
export default linksSlice.reducer;
