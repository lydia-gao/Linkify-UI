// Re-export types from slices for convenience
export type { User, AuthState } from "@/store/slices/authSlice";
export type {
  Link,
  QRCode,
  Barcode,
  LinksState,
} from "@/store/slices/linksSlice";
export type { Notification, UIState } from "@/store/slices/uiSlice";

// Additional common types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface StatsData {
  links: {
    total: number;
    change: number;
    changeType: "positive" | "negative";
  };
  qrCodes: {
    total: number;
    change: number;
    changeType: "positive" | "negative";
  };
  barcodes: {
    total: number;
    change: number;
    changeType: "positive" | "negative";
  };
}

export interface BestLink {
  id: string;
  name: string;
  amount: string;
  lastClick: string;
}

export interface RecentClick {
  id: string;
  link: string;
  clickId: string;
  date: string;
  clientName: string;
  country: string;
  amount: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  type: "links" | "qr-codes" | "barcodes";
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
}
