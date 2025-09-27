# Linkify - Link Management Platform

A modern full-stack web application for managing and tracking links, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Authentication**: Login and registration pages with Google OAuth integration (UI only)
- **Dashboard**: Analytics overview with stats cards, charts, and recent activity
- **Link Management**: Create, view, edit, and organize links with categories and tags
- **Responsive Design**: Modern UI with shadcn/ui components and Tailwind CSS
- **State Management**: Redux Toolkit for global state management

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Redux Toolkit + React Redux
- **Icons**: Lucide React
- **Development**: ESLint + TypeScript

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with Redux provider
│   ├── page.tsx          # Landing page (redirects to login)
│   ├── login/page.tsx    # Login page
│   ├── register/page.tsx # Registration page
│   ├── dashboard/page.tsx # Dashboard with analytics
│   └── links/
│       ├── page.tsx      # Links list page
│       └── new/page.tsx  # Create/edit link page
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Navbar.tsx       # Top navigation bar
│   ├── LinkCard.tsx     # Link display card
│   └── FormInput.tsx    # Form input component
├── lib/                 # Utility functions
├── store/               # Redux Toolkit store and slices
├── styles/              # Global CSS and Tailwind config
└── types/               # TypeScript type definitions
```

## Getting Started

### Configure API Base URL

Copy `.env.local.example` to `.env.local` and set your API server URL (defaults to localhost):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Pages Overview

### Authentication

- **Login Page** (`/login`): Clean login form with Google OAuth button
- **Register Page** (`/register`): Registration form with terms acceptance

### Dashboard (`/dashboard`)

- **Stats Cards**: Total links, clicks, and revenue with percentage changes
- **Analytics Chart**: Clicks over time visualization
- **Revenue Breakdown**: Revenue by source/category
- **Recent Activity**: Table of recent clicks and transactions

### Link Management

- **Links List** (`/links`): Grid view of all links with pagination
- **Create Link** (`/links/new`): Form to create new links with categories and tags

## Mock Data

The application currently uses mock data for demonstration:

- Sample user profile in Redux auth slice
- 5 sample links with various categories and stats
- Dashboard analytics with realistic metrics
- Recent clicks and revenue data

## API & Auth Integration

- Axios client is configured at `src/lib/api/axios.ts` and reads `NEXT_PUBLIC_API_BASE_URL`.
- Redux Toolkit auth slice lives in `src/store/slices/authSlice.ts` with two thunks:
  - `registerUser` → POST `/auth/` JSON body: `{ email, username, hashed_password }`
  - `loginUser` → POST `/auth/token` form data: `username`, `password`; stores `access_token` in localStorage.
- Provider is wired in `src/app/layout.tsx` via `src/store/Providers.tsx`.

You can test flows using the Login and Register pages now. Successful login redirects to `/dashboard`.

## Development

- **Linting**: `npm run lint`
- **Build**: `npm run build`
- **Start**: `npm start`

## License

© 2023 Linkify. All rights reserved.
