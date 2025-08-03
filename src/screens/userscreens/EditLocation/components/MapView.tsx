import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/Colors';
import { MapViewProps } from '../types';
import { useTranslation } from '../../../../contexts/TranslationContext';

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

  useEffect(() => {
    if (selectedLocation) {
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

  const initialRegion: Region = initialLocation ? {
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  } : {
    latitude: 31.9454,
    longitude: 35.9284,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  const handleRegionChangeComplete = (region: Region) => {
    onLocationSelect({
      latitude: region.latitude,
      longitude: region.longitude
    });
  };

  const handleMyLocation = () => {
    if (mapRef.current && initialLocation) {
      mapRef.current.animateToRegion({
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.headerButton}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.editLocation.deliveryAddress}</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Map - Full Width */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          onRegionChangeComplete={handleRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
          showsTraffic={false}
          showsBuildings={true}
          showsIndoors={true}
        >
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              pinColor={Colors.primary}
            />
          )}
        </MapView>

        {/* Map Controls - Floating */}
        <View style={styles.mapControls}>
          <View style={styles.googleLogo}>
            <Text style={styles.googleText}>Google</Text>
          </View>
          
          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.controlButton} onPress={handleMyLocation}>
              <Icon name="my-location" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="layers" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {selectedLocation ? (
          <View style={styles.locationInfo}>
            <View style={styles.locationDetails}>
              <Icon name="location-on" size={20} color={Colors.primary} />
              <View style={styles.locationText}>
                <Text style={styles.locationName}>
                  {currentLocationName || t.editLocation.currentLocation}
                </Text>
                <Text style={styles.locationSubtitle}>
                  {t.editLocation.locationBubble.subtitle}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={onConfirm}
              disabled={loading}
            >
              <Text style={styles.confirmButtonText}>{t.editLocation.confirm}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.detectingContainer}>
            <Text style={styles.detectingText}>{t.editLocation.detectingLocation}</Text>
          </View>
        )}
      </View>
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  mapControls: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  googleLogo: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  googleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  controlButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  locationText: {
    marginLeft: 12,
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  locationSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detectingContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  detectingText: {
    fontSize: 14,
    color: '#666',
  },
});

export default LocationMapView; 