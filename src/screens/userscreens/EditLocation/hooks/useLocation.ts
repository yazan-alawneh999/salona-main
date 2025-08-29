import { useState } from 'react';
import { Platform, PermissionsAndroid, Linking, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../types';
import { useTranslation } from '../../../../contexts/TranslationContext';

// Check if location services are enabled
const checkLocationServicesEnabled = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      () => resolve(true),
      (error) => {
        if (error.code === 2) {
          resolve(false); // Location services disabled
        } else {
          resolve(true); // Other errors, but services might be enabled
        }
      },
      { timeout: 5000, maximumAge: 60000 }
    );
  });
};

const LOCATION_STORAGE_KEY = 'last_known_location';

export const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const saveLocationToStorage = async (location: Location) => {
    try {
      await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
      console.log('Location saved to storage:', location);
    } catch (error) {
      console.error('Error saving location to storage:', error);
    }
  };

  const getLocationFromStorage = async (): Promise<Location | null> => {
    try {
      const storedLocation = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
      if (storedLocation) {
        const location = JSON.parse(storedLocation);
        console.log('Retrieved location from storage:', location);
        return location;
      }
      return null;
    } catch (error) {
      console.error('Error getting location from storage:', error);
      return null;
    }
  };

  const requestLocationPermission = async () => {
    console.log('Requesting location permission...');
    if (Platform.OS === 'ios') {
      try {
        console.log('iOS platform detected, requesting authorization...');
        await Geolocation.requestAuthorization();
        console.log('iOS location authorization successful');
        return true;
      } catch (error) {
        console.error('iOS location permission error:', error);
        setError('Failed to request location permission on iOS');
        Alert.alert(t.editLocation.PermissionError);
        return false;
      }
    } else {
      try {
        console.log('Android platform detected, checking permission...');
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        console.log('Android permission check result:', granted);

        if (!granted) {
          console.log('Permission not granted, requesting...');
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message: "App needs access to your location to show your current position",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          console.log('Permission request result:', result);

          if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Permission permanently denied');
            Alert.alert(
              t.editLocation.PermissionRequired,
              t.editLocation.PermissionRequiredMessage,
              [
                { text: t.editLocation.cancel, style: 'cancel' },
                { text: t.editLocation.openSettings, onPress: () => Linking.openSettings() }
              ]
            );
            return false;
          } else if (result !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission denied');
            Alert.alert(
              t.editLocation.PermissionRequired,
              t.editLocation.PermissionRequiredMessage,
              [
                { text: t.editLocation.cancel, style: 'cancel' },
                { text: t.editLocation.openSettings, onPress: () => Linking.openSettings() }
              ]
            );
            return false;
          }
        }
        console.log('Permission granted');
        return true;
      } catch (err) {
        console.error('Android permission error:', err);
        setError('Failed to request location permission on Android');
        Alert.alert(t.editLocation.PermissionError);
        return false;
      }
    }
  };

  const getCurrentLocation = async (): Promise<Location | null> => {
    try {
      console.log('Starting to get current location...');
      setLoading(true);
      setError(null);

      // First try to get stored location
      const storedLocation = await getLocationFromStorage();
      if (storedLocation) {
        console.log('Using stored location:', storedLocation);
        setLoading(false);
        return storedLocation;
      }

      // If no stored location, check permission and get fresh location
      const hasPermission = await requestLocationPermission();
      console.log('Permission check result:', hasPermission);
      
      if (!hasPermission) {
        console.log('Permission not granted, returning null');
        setLoading(false);
        return null;
      }

      // Check if location services are enabled
      const servicesEnabled = await checkLocationServicesEnabled();
      if (!servicesEnabled) {
        console.log('Location services are disabled');
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings to use this feature.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
        setLoading(false);
        return null;
      }

      return new Promise((resolve, reject) => {
        console.log('Calling getCurrentPosition...');
        
        const timeoutId = setTimeout(() => {
          console.log('Location request timed out');
          setLoading(false);
          reject(new Error('Location request timed out'));
        }, 15000); // Reduced timeout to 15 seconds

        Geolocation.getCurrentPosition(
          (position) => {
            console.log('Location retrieved successfully:', position);
            clearTimeout(timeoutId);
            setLoading(false);
            
            // Validate coordinates
            const { latitude, longitude } = position.coords;
            if (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) {
              const location = {
                latitude: latitude,
                longitude: longitude
              };
              
              // Save to storage for future use
              saveLocationToStorage(location);
              resolve(location);
            } else {
              console.error('Invalid coordinates received:', { latitude, longitude });
              reject(new Error('Invalid coordinates received'));
            }
          },
          (error) => {
            console.error('Location error:', error);
            clearTimeout(timeoutId);
            setLoading(false);
            setError(error.message);
            
            // Provide more specific error messages
            let errorMessage = 'Failed to get location';
            if (error.code === 3) {
              errorMessage = 'Location request timed out. Please check your GPS signal and try again.';
            } else if (error.code === 2) {
              errorMessage = 'No location provider available. Please:\n\n1. Turn ON Location Services\n2. Enable GPS\n3. Check if you\'re in airplane mode\n4. Try moving to an area with better signal';
            } else if (error.code === 1) {
              errorMessage = 'Location permission denied. Please enable location services.';
            }
            
            Alert.alert(
              'Location Error', 
              errorMessage,
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() }
              ]
            );
            reject(error);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000, // Reduced timeout
            maximumAge: 300000 // 5 minutes - use cached location if available
          }
        );
      });
    } catch (error) {
      console.error('Error in getCurrentLocation:', error);
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Failed to get location');
      return null;
    }
  };

  return {
    loading,
    error,
    requestLocationPermission,
    getCurrentLocation,
    getLocationFromStorage,
    saveLocationToStorage
  };
}; 