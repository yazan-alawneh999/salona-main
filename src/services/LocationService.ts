import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from '@env';

class LocationService {
  private watchId: number | null = null;
  private locationUpdateCallback: ((location: { latitude: number; longitude: number }) => void) | null = null;

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs access to your location to show nearby salons",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Request background location permission
          const backgroundGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            {
              title: "Background Location Permission",
              message: "App needs access to your location in the background to show nearby salons",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          return backgroundGranted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return false;
      } catch (err) {
        console.error('Error requesting location permissions:', err);
        return false;
      }
    }
    return true; // iOS handles this differently
  }

  startLocationUpdates(callback: (location: { latitude: number; longitude: number }) => void) {
    this.locationUpdateCallback = callback;

    // First get the current location
    Geolocation.getCurrentPosition(
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => console.error('Error getting initial location:', error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    // Then start watching for updates
    this.watchId = Geolocation.watchPosition(
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => console.error('Error watching location:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update every 10 meters
        interval: 5000, // Update every 5 seconds
        fastestInterval: 2000, // Fastest rate in milliseconds
      }
    );
  }

  stopLocationUpdates() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    this.locationUpdateCallback = null;
  }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  }
}

export const locationService = new LocationService(); 