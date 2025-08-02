export interface Address {
  id: number;
  description: string;
  locationLink: string;
  isFavorite: boolean;
  isPrimary: boolean;
  latitude: number;
  longitude: number;
}

export interface User {
  isAuthenticated: boolean;
  id: number;
  name: string;
  email: string;
  type: string;
  token?: string;
  addresses?: Address[];
  isActive?: boolean;
  about?: string | null;
  avatar?: string | null;
  bio?: string | null;
  created_at?: string;
  email_verified_at?: string | null;
  image_url?: string | null;
  phone_number?: string | null;
  updated_at?: string;
  verification_code?: string | null;
} 