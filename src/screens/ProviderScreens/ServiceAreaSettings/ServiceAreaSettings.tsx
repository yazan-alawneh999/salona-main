import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  addServiceArea,
  removeServiceArea,
  setServiceAreas,
  setLoading,
  setError,
} from '../../../redux/slices/serviceAreaSlice';
import { ServiceArea } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from '../../../contexts/TranslationContext';
const ServiceAreaSettings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { providerServiceArea, isLoading } = useSelector((state: RootState) => state.serviceArea);
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [areaName, setAreaName] = useState('');
  const [radius, setRadius] = useState(5); // Default 5km radius
  const { t } = useTranslation();
  // Initialize service areas if not exists
  useEffect(() => {
    const loadServiceAreas = async () => {
      try {
        dispatch(setLoading(true));
        
        // Try to load from AsyncStorage first
        const storedAreas = await AsyncStorage.getItem('providerServiceArea');
        
        if (storedAreas) {
          const parsedAreas = JSON.parse(storedAreas);
          dispatch(setServiceAreas(parsedAreas));
        } else if (!providerServiceArea && user?.id) {
          // Initialize with empty areas if none exist
          dispatch(
            setServiceAreas({
              providerId: user.id.toString(),
              areas: [],
              defaultRadius: 5,
            })
          );
        }
      } catch (error) {
        console.error('Error loading service areas:', error);
        dispatch(setError('Failed to load service areas'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadServiceAreas();
  }, [dispatch, providerServiceArea, user?.id]);

  const handleMapPress = (event: any) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleAddArea = () => {
    if (!selectedLocation || !areaName.trim()) {
      Alert.alert(t.serviceAreaSettings.errors.noLocation);
      return;
    }

    if (!providerServiceArea) {
      Alert.alert(t.serviceAreaSettings.errors.noServiceArea);
      return;
    }

    const newArea: ServiceArea = {
      id: uuidv4(),
      name: areaName,
      coordinates: selectedLocation,
      radius: radius,
    };

    dispatch(addServiceArea(newArea));
    setSelectedLocation(null);
    setAreaName('');
    
    Alert.alert(t.serviceAreaSettings.success.addServiceArea);
  };

  const handleRemoveArea = (areaId: string) => {
    Alert.alert(
      t.serviceAreaSettings.removeArea,
      t.serviceAreaSettings.removeAreaMessage,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => dispatch(removeServiceArea(areaId)) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.gold} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Area Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Map</Text>
        <Text style={styles.instruction}>
          Tap on the map to select a location for your service area
        </Text>
        
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{
              latitude: 25.2048, // Default to Dubai coordinates
              longitude: 55.2708,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {providerServiceArea?.areas.map((area) => (
              <React.Fragment key={area.id}>
                <Marker
                  coordinate={area.coordinates}
                  title={area.name}
                  description={`Radius: ${area.radius}km`}
                />
                <Circle
                  center={area.coordinates}
                  radius={area.radius * 1000} // Convert km to meters
                  fillColor="rgba(255, 215, 0, 0.2)"
                  strokeColor={Colors.gold}
                  strokeWidth={2}
                />
              </React.Fragment>
            ))}
            
            {selectedLocation && (
              <>
                <Marker
                  coordinate={selectedLocation}
                  title="Selected Location"
                  pinColor={Colors.gold}
                />
                <Circle
                  center={selectedLocation}
                  radius={radius * 1000} // Convert km to meters
                  fillColor="rgba(255, 215, 0, 0.2)"
                  strokeColor={Colors.gold}
                  strokeWidth={2}
                />
              </>
            )}
          </MapView>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add New Service Area</Text>
          
          <Text style={styles.label}>Area Name</Text>
          <TextInput
            style={styles.input}
            value={areaName}
            onChangeText={setAreaName}
            placeholder={t.serviceAreaSettings.placeholder.areaName}
            placeholderTextColor={Colors.softGray}
          />
          
          <Text style={styles.label}>Radius (km)</Text>
          <View style={styles.radiusButtons}>
            {[5, 10, 15, 20, 25].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.radiusButton,
                  radius === value && styles.radiusButtonActive,
                ]}
                onPress={() => setRadius(value)}
              >
                <Text
                  style={[
                    styles.radiusButtonText,
                    radius === value && styles.radiusButtonTextActive,
                  ]}
                >
                  {value}km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddArea}
            disabled={!selectedLocation || !areaName.trim()}
          >
            <Text style={styles.buttonText}>Add Service Area</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areasListContainer}>
          <Text style={styles.sectionTitle}>Your Service Areas</Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.gold} />
          ) : providerServiceArea?.areas.length === 0 ? (
            <Text style={styles.emptyText}>No service areas added yet</Text>
          ) : (
            providerServiceArea?.areas.map((area) => (
              <View key={area.id} style={styles.areaItem}>
                <View>
                  <Text style={styles.areaName}>{area.name}</Text>
                  <Text style={styles.areaDetails}>
                    Radius: {area.radius}km
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveArea(area.id)}
                  style={styles.removeButton}
                >
                  <Icon name="delete" size={20} color={Colors.red} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    marginBottom: 16,
  },
  mapContainer: {
    height: 300,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  map: {
    flex: 1,
  },
  formContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: Colors.hardGray,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  radiusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  radiusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  radiusButtonActive: {
    backgroundColor: Colors.gold,
  },
  radiusButtonText: {
    color: Colors.gold,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
  },
  radiusButtonTextActive: {
    color: Colors.black,
    fontFamily: 'Maitree-Bold',
  },
  button: {
    backgroundColor: Colors.gold,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
    color: Colors.black,
  },
  areasListContainer: {
    marginBottom: 24,
  },
  areaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.hardGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  areaName: {
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    marginBottom: 4,
  },
  areaDetails: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.softGray,
  },
  removeButton: {
    padding: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.softGray,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ServiceAreaSettings; 