import { useState } from 'react';
import { Platform, PermissionsAndroid, Linking, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../types';
import { useTranslation } from '../../../../contexts/TranslationContext';
export const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const requestLocationPermission = async () => {
    console.log('Requesting location permission...');
    if (Platform.OS === 'ios') {
      try {
        console.log('iOS platform detected, requesting authorization...');
        await Geolocation.requestAuthorization();
        console.log('iOS location authorization successful');
      } catch (error) {
        console.error('iOS location permission error:', error);
        setError('Failed to request location permission on iOS');
        Alert.alert(t.editLocation.PermissionError);
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
    return true;
  };

  const getCurrentLocation = async (): Promise<Location> => {
    try {
      console.log('Starting to get current location...');
      setLoading(true);
      setError(null);

      // First check if we have permission
      const hasPermission = await requestLocationPermission();
      console.log('Permission check result:', hasPermission);
      
      if (!hasPermission) {
        console.log('Permission not granted, throwing error');
        throw new Error('Location permission not granted');
      }

      return new Promise((resolve, reject) => {
        console.log('Calling getCurrentPosition...');
        
        Geolocation.getCurrentPosition(
          (position) => {
            console.log('Location retrieved successfully:', position);
            setLoading(false);
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error('Location error:', error);
            setLoading(false);
            setError(error.message);
            
            // Provide more specific error messages
            let errorMessage = 'Failed to get location';
            if (error.code === 3) {
              errorMessage = 'Location request timed out. Please check your GPS signal and try again.';
            } else if (error.code === 2) {
              errorMessage = 'Location is unavailable. Please check your GPS settings.';
            } else if (error.code === 1) {
              errorMessage = 'Location permission denied. Please enable location services.';
            }
            
            Alert.alert(t.editLocation.error.locationError, errorMessage);
            reject(error);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 10000
          }
        );
      });
    } catch (error) {
      console.error('Error in getCurrentLocation:', error);
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Failed to get location');
      throw error;
    }
  };

  return {
    loading,
    error,
    requestLocationPermission,
    getCurrentLocation
  };
}; 