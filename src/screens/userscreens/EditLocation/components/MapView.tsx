import React, { useRef, useState, useEffect } from 'react';
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
      
      // If initial location is provided, set it as selected location
      if (!selectedLocation) {
        onLocationSelect(initialLocation);
      }
    } else {
      setMapRegion(defaultRegion);
    }
  }, [initialLocation]);

  useEffect(() => {
    if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
      // Get address from coordinates
      fetchAddressFromCoordinates(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation]);

  const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {
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
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setCurrentLocationName(t.editLocation.currentLocation);
      setCurrentAddress(t.editLocation.currentLocation);
    }
  };

  const handleRegionChangeComplete = (region: Region) => {
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
  };

  const handleMyLocation = () => {
    if (mapRef.current && initialLocation && initialLocation.latitude && initialLocation.longitude) {
      const region: Region = {
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      
      mapRef.current.animateToRegion(region, 1000);
      onLocationSelect(initialLocation);
    }
  };

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
            showsUserLocation={true}
            showsMyLocationButton={false}
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
                  {currentLocationName}
                </Text>
                <Text style={styles.locationAddress} numberOfLines={2}>
                  {currentAddress}
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