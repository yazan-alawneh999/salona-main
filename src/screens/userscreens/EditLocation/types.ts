export interface Address {
  id: number;
  description: string;
  locationLink: string;
  isFavorite: boolean;
  isPrimary: boolean;
  latitude: number;
  longitude: number;
  isCurrentLocation?: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface MapViewProps {
  onLocationSelect: (location: Location) => void;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLocation: Location | null;
  initialLocation: Location | null;
  loading: boolean;
}

export interface AddressListProps {
  addresses: Address[];
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onSetPrimary: (id: number) => void;
  loading: boolean;
  onEdit?: (address: Address) => void;
} 