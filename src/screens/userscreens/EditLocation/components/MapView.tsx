import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/Colors';
import { MapViewProps } from '../types';

const LocationMapView: React.FC<MapViewProps> = ({
  onLocationSelect,
  onConfirm,
  onCancel,
  selectedLocation,
  initialLocation,
  loading
}) => {
  const mapRef = useRef<MapView>(null);

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

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            pinColor={Colors.gold}
          />
        )}
      </MapView>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={onCancel}
          disabled={loading}
        >
          <Icon name="close" size={24} color={Colors.white} />
          <Text style={[styles.buttonText, { color: Colors.white }]} numberOfLines={1}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.confirmButton]} 
          onPress={onConfirm}
          disabled={loading || !selectedLocation}
        >
          <Icon name="check" size={24} color={Colors.white} />
          <Text style={[styles.buttonText, { color: Colors.white }]} numberOfLines={1}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    flex: 1,
  },
  confirmButton: {
    backgroundColor: Colors.gold,
    flex: 2,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    marginLeft: 8,
    flexShrink: 1,
  },
});

export default LocationMapView; 