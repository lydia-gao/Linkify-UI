export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Link {
  id: string;
  name: string;
  description?: string;
  url: string;
  category: string;
  ownerName: string;
  status: "active" | "inactive";
  expirationDays?: number;
  tags: string[];
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface LinkStats {
  totalLinks: number;
  totalClicks: number;
  totalRevenue: number;
  linksChange: number;
  clicksChange: number;
  revenueChange: number;
}

export interface ClickData {
  date: string;
  clicks: number;
}

export interface RevenueData {
  source: string;
  amount: number;
}

export interface RecentClick {
  clientName: string;
  country: string;
  amount: number;
  date: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LinksState {
  links: Link[];
  selectedLink: Link | null;
  isLoading: boolean;
  error: string | null;
}

export interface DashboardData {
  stats: LinkStats;
  clicksOverTime: ClickData[];
  revenueDetails: RevenueData[];
  recentClicks: RecentClick[];
}

export type LinkCategory =
  | "All"
  | "Active"
  | "Inactive"
  | "Google"
  | "Social"
  | "Email"
  | "Direct"
  | "Ad SEO"
  | "Affiliate";

