// Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Item Types
export type ItemStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface Item {
  id: string;
  name: string;
  description?: string;
  status: ItemStatus;
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
  status?: ItemStatus;
  metadata?: Record<string, string>;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
  status?: ItemStatus;
  metadata?: Record<string, string>;
}

// Pagination Types
export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
}

// Error Types
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errors?: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
  rejectedValue?: string;
}

// State Types
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ItemsState {
  items: Item[];
  selectedItem: Item | null;
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;
}
