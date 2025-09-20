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

## Next Steps

This is a static UI implementation. To make it fully functional:

1. **Backend Integration**: Connect to a real API using Axios
2. **Authentication**: Implement real login/logout with JWT tokens
3. **Database**: Add database integration for persistent data
4. **Real-time Updates**: Add WebSocket support for live updates
5. **Testing**: Add unit and integration tests
6. **Deployment**: Set up CI/CD and deploy to production

## Development

- **Linting**: `npm run lint`
- **Build**: `npm run build`
- **Start**: `npm start`

## License

© 2023 Linkify. All rights reserved.
