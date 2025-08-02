import { Salon } from "./salon";

export type UserStackParamList = {

    HomeScreen: undefined;
    ExploreScreen: undefined;
    FilterScreen: undefined;
    SalonProfileScreen: {
        salon: Salon;
      };
      OurSalonsScreen: undefined;
    AccountScreen: undefined;
    ReviewBookingScreen: {
  bookingDetails: string;  // changed from `booking` to match new naming
  isCompleted: boolean;
    booking: any;
};
NotificationsScreen: undefined;
EditProfileScreen: undefined;
EditLocationScreen: undefined;
FavoritesScreen: undefined;
BookingsPage: undefined;
BookingScreen: undefined;
ChatScreen: {
    provider: {
        id: number;
        name: string;
        image_url: string;
    };
};
  };
  export type ProviderStackParamList = {
    ProviderBookingScreen: { initialTab?: 'booked' | 'completed' | 'cancelled' } | undefined;
    ProviderReviewBookingScreen: {
      bookingDetails: string;
      isCompleted: boolean;
      booking?: any; // optional if needed
    };
    ProviderProfile: undefined;
    ProviderAccount: undefined;
    ProviderNotifications: undefined;
    ServiceAreaSettings: undefined;
    ProviderChatScreen: {
      user: {
        id: number;
        name: string;
        image_url: string;
      };
    };
  };
  
export interface ServiceArea {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  radius: number; // in kilometers
}

export interface ProviderServiceArea {
  providerId: string;
  areas: ServiceArea[];
  defaultRadius: number;
}

export interface TimePeriod {
  start: string;
  end: string;
  available: boolean;
}

export interface SalonAvailability {
  day: string;
  opening_time: string;
  closing_time: string;
  periods: TimePeriod[];
}

export interface UpdateAvailabilityRequest {
  id: number;
  opening_time: string;
  closing_time: string;
}

export interface GetAvailabilityRequest {
  date: string;
}
  