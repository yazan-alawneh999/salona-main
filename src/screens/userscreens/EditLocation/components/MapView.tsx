import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/Colors';
import { MapViewProps } from '../types';
import { useTranslation } from '../../../../contexts/TranslationContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const LocationMapView: React.FC<MapViewProps> = ({
  onLocationSelect,
  onConfirm,
  onCancel,
  selectedLocation,
  initialLocation,
  loading
}) => {
  const { t } = useTranslation();
  const mapRef = useRef<MapView>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [tempLocation, setTempLocation] = useState<LatLng | null>(null);
  const geocodingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Default region (Amman, Jordan)
  const defaultRegion: Region = {
    latitude: 31.9454,
    longitude: 35.9284,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  useEffect(() => {
    // Set initial region based on initialLocation or default
    if (initialLocation && initialLocation.latitude && initialLocation.longitude) {
      const region: Region = {
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      setMapRegion(region);
      
      // If initial location is provided, set it as selected location and get its address
      if (!selectedLocation) {
        onLocationSelect(initialLocation);
        getAddressFromCoordinates(initialLocation.latitude, initialLocation.longitude);
      }
    } else {
      setMapRegion(defaultRegion);
    }
  }, [initialLocation]);

  // Function to get address from coordinates
  const getAddressFromCoordinates = useCallback(async (latitude: number, longitude: number) => {
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB-w38SqAU85WY8NzUDFKw5JX5RakNulaA`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const address = data.results[0].formatted_address;
        setCurrentAddress(address);
        
        // Extract a shorter name for display
        const addressParts = address.split(',');
        const shortName = addressParts[0] || address;
        setCurrentLocationName(shortName);
      } else {
        setCurrentLocationName(t.editLocation.currentLocation);
        setCurrentAddress(t.editLocation.currentLocation);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setCurrentLocationName(t.editLocation.currentLocation);
      setCurrentAddress(t.editLocation.currentLocation);
    } finally {
      setIsGeocoding(false);
    }
  }, [t.editLocation.currentLocation]);

  // Debounced geocoding function for map movements
  const debouncedGeocoding = useCallback((latitude: number, longitude: number) => {
    // Clear existing timeout
    if (geocodingTimeoutRef.current) {
      clearTimeout(geocodingTimeoutRef.current);
    }

    // Set new timeout for geocoding
    geocodingTimeoutRef.current = setTimeout(() => {
      getAddressFromCoordinates(latitude, longitude);
    }, 300); // Reduced to 300ms for faster response
  }, [getAddressFromCoordinates]);

  // Handle map press for immediate pin placement
  const handleMapPress = useCallback((event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    
    // Immediately set the pin location
    const newLocation = { latitude, longitude };
    setTempLocation(newLocation);
    onLocationSelect(newLocation);
    
    // Get address for the new location
    getAddressFromCoordinates(latitude, longitude);
  }, [onLocationSelect, getAddressFromCoordinates]);

  useEffect(() => {
    if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
      // Only geocode if location has significantly changed
      const distance = Math.sqrt(
        Math.pow(selectedLocation.latitude - (mapRegion?.latitude || 0), 2) +
        Math.pow(selectedLocation.longitude - (mapRegion?.longitude || 0), 2)
      );
      
      if (distance > 0.0001) { // Only geocode if moved more than ~10m
        debouncedGeocoding(selectedLocation.latitude, selectedLocation.longitude);
      }
    }
  }, [selectedLocation, debouncedGeocoding]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (geocodingTimeoutRef.current) {
        clearTimeout(geocodingTimeoutRef.current);
      }
    };
  }, []);

  const handleRegionChangeComplete = useCallback((region: Region) => {
    // Only update if the change is significant (not just map movement)
    if (selectedLocation) {
      const distance = Math.sqrt(
        Math.pow(region.latitude - selectedLocation.latitude, 2) +
        Math.pow(region.longitude - selectedLocation.longitude, 2)
      );
      
      if (distance > 0.001) { // Only update if moved more than ~100m
        onLocationSelect({
          latitude: region.latitude,
          longitude: region.longitude
        });
      }
    }
  }, [selectedLocation, onLocationSelect]);

  const handleMyLocation = useCallback(() => {
    if (mapRef.current && initialLocation && initialLocation.latitude && initialLocation.longitude) {
      const region: Region = {
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      
      mapRef.current.animateToRegion(region, 1000);
      onLocationSelect(initialLocation);
      getAddressFromCoordinates(initialLocation.latitude, initialLocation.longitude);
    }
  }, [initialLocation, onLocationSelect, getAddressFromCoordinates]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.headerButton}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.editLocation.deliveryAddress}</Text>
        <TouchableOpacity 
          style={[styles.confirmButton, !selectedLocation && styles.confirmButtonDisabled]}
          onPress={onConfirm}
          disabled={!selectedLocation || loading}>
          <Text style={[styles.confirmButtonText, !selectedLocation && styles.confirmButtonTextDisabled]}>
            {t.editLocation.confirm}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map - Full Width */}
      <View style={styles.mapContainer}>
        {mapRegion && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={mapRegion}
            onRegionChangeComplete={handleRegionChangeComplete}
            onPress={handleMapPress}
            showsUserLocation={true}
            showsMyLocationButton={false}
            maxZoomLevel={18}
            minZoomLevel={10}
          >
            {selectedLocation && selectedLocation.latitude && selectedLocation.longitude && (
              <Marker
                coordinate={selectedLocation}
                title={t.editLocation.selectedLocation}
                pinColor={Colors.primary}
              />
            )}
          </MapView>
        )}

        {/* My Location Button */}
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={handleMyLocation}
        >
          <Icon name="my-location" size={24} color={Colors.primary} />
        </TouchableOpacity>

        {/* Location Info Card */}
        {selectedLocation && selectedLocation.latitude && selectedLocation.longitude && (
          <View style={styles.locationCard}>
            <View style={styles.locationInfo}>
              <Icon name="location-on" size={20} color={Colors.primary} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationName} numberOfLines={1}>
                  {isGeocoding ? t.editLocation.gettingAddress : currentLocationName}
                </Text>
                <Text style={styles.locationAddress} numberOfLines={2}>
                  {isGeocoding ? t.editLocation.gettingAddress : currentAddress}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  confirmButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  confirmButtonTextDisabled: {
    color: '#999',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationCard: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default LocationMapView; 