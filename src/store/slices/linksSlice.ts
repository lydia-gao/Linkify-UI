import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinksState, Link } from "../../types";

const mockLinks: Link[] = [
  {
    id: "1",
    name: "Google Search",
    description: "Main Google search page",
    url: "https://www.google.com",
    category: "Google",
    ownerName: "John Doe",
    status: "active",
    expirationDays: 365,
    tags: ["search", "browser"],
    clicks: 1250,
    createdAt: "2023-01-15",
    updatedAt: "2023-02-01",
  },
  {
    id: "2",
    name: "GitHub Repository",
    description: "My main development repository",
    url: "https://github.com/user/repo",
    category: "Social",
    ownerName: "John Doe",
    status: "active",
    expirationDays: 180,
    tags: ["development", "git"],
    clicks: 856,
    createdAt: "2023-01-20",
    updatedAt: "2023-02-05",
  },
  {
    id: "3",
    name: "Portfolio Website",
    description: "Personal portfolio and resume",
    url: "https://portfolio.example.com",
    category: "Direct",
    ownerName: "John Doe",
    status: "inactive",
    expirationDays: 90,
    tags: ["portfolio", "resume"],
    clicks: 432,
    createdAt: "2023-02-01",
    updatedAt: "2023-02-10",
  },
  {
    id: "4",
    name: "Newsletter Signup",
    description: "Weekly newsletter subscription",
    url: "https://newsletter.example.com/signup",
    category: "Email",
    ownerName: "John Doe",
    status: "active",
    expirationDays: 30,
    tags: ["newsletter", "subscription"],
    clicks: 234,
    createdAt: "2023-02-05",
    updatedAt: "2023-02-15",
  },
  {
    id: "5",
    name: "Product Demo",
    description: "Interactive product demonstration",
    url: "https://demo.example.com",
    category: "Ad SEO",
    ownerName: "John Doe",
    status: "active",
    expirationDays: 60,
    tags: ["demo", "product"],
    clicks: 678,
    createdAt: "2023-02-10",
    updatedAt: "2023-02-20",
  },
];

const initialState: LinksState = {
  links: mockLinks,
  selectedLink: null,
  isLoading: false,
  error: null,
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<Link[]>) => {
      state.links = action.payload;
    },
    addLink: (state, action: PayloadAction<Link>) => {
      state.links.push(action.payload);
    },
    updateLink: (state, action: PayloadAction<Link>) => {
      const index = state.links.findIndex(
        (link) => link.id === action.payload.id
      );
      if (index !== -1) {
        state.links[index] = action.payload;
      }
    },
    deleteLink: (state, action: PayloadAction<string>) => {
      state.links = state.links.filter((link) => link.id !== action.payload);
    },
    setSelectedLink: (state, action: PayloadAction<Link | null>) => {
      state.selectedLink = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLinks,
  addLink,
  updateLink,
  deleteLink,
  setSelectedLink,
  setLoading,
  setError,
} = linksSlice.actions;

export default linksSlice.reducer;
