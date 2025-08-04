import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from '../../contexts/TranslationContext';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

type RootStackParamList = {
  EditLocation: undefined;
  // Add other screen names as needed
};

type EditLocationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditLocation'
>;

interface Location {
  latitude: number;
  longitude: number;
}

interface EditLocationProps {
  navigation: EditLocationScreenNavigationProp;
}

const EditLocation: React.FC<EditLocationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const mapRef = useRef<MapView>(null);

  const handleConfirmLocation = () => {
    // Implement the logic to confirm the location
    if (selectedLocation) {
      // Navigate back with the selected location
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.editLocation.title}</Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
          disabled={!selectedLocation}>
          <Text style={[styles.confirmButtonText, !selectedLocation && styles.confirmButtonTextDisabled]}>
            {t.editLocation.confirm}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder={t.editLocation.searchPlaceholder}
          onPress={(data, details = null) => {
            if (details) {
              setSelectedLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
          }}
          query={{
            key: 'YOUR_GOOGLE_PLACES_API_KEY',
            language: 'ar',
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              height: 44,
              fontSize: 16,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              paddingHorizontal: 12,
            },
          }}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 24.7136, // Default to a location (you can set this to user's current location)
            longitude: 46.6753,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(event) => {
            setSelectedLocation(event.nativeEvent.coordinate);
          }}>
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title={t.editLocation.selectedLocation}
            />
          )}
        </MapView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmButton: {
    padding: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  confirmButtonTextDisabled: {
    color: '#ccc',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default EditLocation;
