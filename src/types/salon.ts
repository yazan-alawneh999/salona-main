export interface Service {
  id: number;
  user_id: number;
  service: string;
  description: string;
  time: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface CreateService {
  service: string;
  price: number;
  description?: string;
  time?: string;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  services: string; // JSON string of services
  amount: number;
  time: string;
  salon_id: number;
  salon_name?: string;
  salon?: Salon;
  discount_percentage?: number;
}

export interface CreatePackage {
  salon_id: number;
  name: string;
  description: string;
  services: string; // JSON string of services
  amount: number;
  time: string;
}

export interface UpdatePackage {
  name: string;
  description: string;
  services: string; // JSON string of services
  amount: number;
  time: string;
  discount_percentage?: number;
}

export interface TimePeriod {
  start: string;
  end: string;
  available: boolean;
}

export interface SalonAvailability {
  id: number;
  user_id: number;
  time: string;
  day: string;
  opening_time: string;
  closing_time: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateAvailabilityRequest {
  id: number;  // This is the day's availability ID (1 for Monday, 2 for Tuesday, etc.)
  opening_time: string;
  closing_time: string;
}

export interface GetAvailabilityRequest {
  date: string;  // Format: "YYYY-MM-DD"
  salonId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Salon {
  address: string | null;
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  phone_number: string | null;
  type: string;
  about: string | null;
  verification_code: string | null;
  email_verified_at: string | null;
  bio: string | null;
  is_online: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  average_rating: string;
  availabilities: SalonAvailability[];
  services: Service[];
  packages: Package[];
  ratings_received: Array<{
    id: number;
    user_id: number;
    salon_id: number;
    rate: number;
    message: string | null;
    created_at: string | null;
    updated_at: string | null;
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string | null;
      phone_number: string | null;
      type: string;
      about: string | null;
      verification_code: string | null;
      email_verified_at: string | null;
      bio: string | null;
      is_online: number;
      is_active: number;
      created_at: string;
      updated_at: string;
      image_url: string | null;
      average_rating: string;
    };
  }>;
  categories: Array<{
    user_id: number;
    category_id: number;
  }>;
}

export interface SalonResponse {
  salons: Salon[];
  
  
}

export interface CreateServiceRequest {
  salonId: number;
  services: CreateService[];
}

export interface UpdateServiceRequest {
  salonId: number;
  services: Service[];
}

export interface DeleteServiceRequest {
  salonId: number;
  serviceId: number;
}

export interface CreatePackageRequest {
  salon_id: number;
  name: string;
  description: string;
  services: string;
  amount: number;
  time: string;
}

export interface UpdatePackageRequest {
  salonId: number;
  packageId: number;
  package: UpdatePackage;
}

export interface DeletePackageRequest {
  salonId: number;
  packageId: number;
}

export interface Appointment {
  id: number;
  appointment_day: string;
  appointment_time: string;
  status: string;
  total_amount: string;
  is_read: number;
  salon: {
    id: number;
    name: string;
    image_url: string | null;
  };
  services: {
    id: number;
    service: string;
    price: string;
    time: string;
  }[];
} 