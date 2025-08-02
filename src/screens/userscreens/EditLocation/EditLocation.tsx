import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {  updateAddress as updateAddressAction } from '../../../redux/slices/authSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LocationMapView from './components/MapView';
import AddressList from './components/AddressList';
import { useLocation } from './hooks/useLocation';
import { useAddress } from './hooks/useAddress';
import { useTranslation } from '../../../contexts/TranslationContext';
import { useUpdateAddressMutation } from '../../../redux/api/salonApi';
import { useNavigation } from '@react-navigation/native';
interface Address {
  id: number;
  description: string;
  locationLink: string;
  isFavorite: boolean;
  isPrimary: boolean;
  latitude: number;
  longitude: number;
  isCurrentLocation?: boolean;
}

const EditLocationScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user , token } = useSelector((state: RootState) => state.auth);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [initialMapLocation, setInitialMapLocation] = useState<Location | null>(null);
  const fadeAnim = new Animated.Value(0);
  const { t } = useTranslation();
  const { loading: locationLoading, requestLocationPermission, getCurrentLocation } = useLocation();
  const { loading: addressLoading, handleAddAddress, handleDeleteAddress, handleToggleFavorite, handleSetPrimary } = useAddress();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [updateAddressApi] = useUpdateAddressMutation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    requestLocationPermission();
  }, []);

  const handleMapPress = (location: Location) => {
    console.log('Map pressed at location:', location);
    setSelectedLocation(location);
  };

  const handleOpenMap = async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        setInitialMapLocation({
          latitude: location.latitude,
          longitude: location.longitude
        });
        setSelectedLocation({
          latitude: location.latitude,
          longitude: location.longitude
        });
      }
      setShowMap(true);
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert(t.editLocation.errors.noLocation);
    }
  };

  const handleConfirmLocation = async () => {
    console.log('handleConfirmLocation called');
    if (!selectedLocation) {
      console.log('No location selected');
      Alert.alert(t.editLocation.errors.noLocation);
      return;
    }

    try {
      console.log('Selected location:', selectedLocation);
      console.log('Fetching address from coordinates...');
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.latitude},${selectedLocation.longitude}&key=AIzaSyB-w38SqAU85WY8NzUDFKw5JX5RakNulaA`
      );
      const data = await response.json();
      console.log('Geocoding response:', data);
      
      if (data.results && data.results[0]) {
        console.log('Found address:', data.results[0].formatted_address);
        console.log('Adding address to user profile...');
        const newAddressId = await handleAddAddress(
          data.results[0].formatted_address,
          `https://www.google.com/maps/place/?q=place_id:${data.results[0].place_id}`,
          selectedLocation.latitude,
          selectedLocation.longitude
        );
        
        if (newAddressId) {
          const newAddress = {
            id: newAddressId,
            description: data.results[0].formatted_address,
            locationLink: `https://www.google.com/maps/place/?q=place_id:${data.results[0].place_id}`,
            isFavorite: false,
            isPrimary: false,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
          };
          setEditingAddress(newAddress);
          setNewDescription(data.results[0].formatted_address);
          setEditModalVisible(true);
        }
        
        console.log('Address added successfully');
        setShowMap(false);
        setSelectedLocation(null);
      } else {
        console.log('No address found for coordinates');
        Alert.alert(t.editLocation.errors.noAddress);
      }
    } catch (error) {
      console.error('Error in handleConfirmLocation:', error);
      Alert.alert(t.editLocation.errors.noAddress);
    }
  };

  const handleCurrentLocation = async () => {
    console.log('handleCurrentLocation called');
    try {
      console.log('Attempting to get current location...');
      const location = await getCurrentLocation();
      console.log('Location received:', location);
      
      console.log('Fetching address from coordinates...');
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyB-w38SqAU85WY8NzUDFKw5JX5RakNulaA`
      );
      const data = await response.json();
      console.log('Geocoding response:', data);
      
      if (data.results[0]) {
        console.log('Adding address to user profile...');
        const newAddressId = await handleAddAddress(
          data.results[0].formatted_address,
          `https://www.google.com/maps/place/?q=place_id:${data.results[0].place_id}`,
          location.latitude,
          location.longitude
        );
        
        if (newAddressId) {
          const newAddress = {
            id: newAddressId,
            description: data.results[0].formatted_address,
            locationLink: `https://www.google.com/maps/place/?q=place_id:${data.results[0].place_id}`,
            isFavorite: false,
            isPrimary: false,
            latitude: location.latitude,
            longitude: location.longitude
          };
          setEditingAddress(newAddress);
          setNewDescription(data.results[0].formatted_address);
          setEditModalVisible(true);
        }
        
        console.log('Address added successfully');
      } else {
        console.log('No address found for coordinates');
        Alert.alert(t.editLocation.errors.noAddress);
      }
    } catch (error) {
      console.error('Error in handleCurrentLocation:', error);
      Alert.alert(t.editLocation.errors.noAddress);
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewDescription('');
    setEditModalVisible(true);
  };

  const handleSaveDescription = async () => {
    if (!editingAddress || !newDescription.trim()) {
      Alert.alert(t.editLocation.error.invalidDescription);
      return;
    }

    try {
      // Update using the specified API
      
      if (!token) {
        Alert.alert(t.editLocation.error.noAuthenticationToken);
        console.log('No authentication token found', token);
        return;
      }
      const response = await fetch('https://spa.dev2.prodevr.com/api/update-address-desc', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: editingAddress.id,
          description: newDescription.trim(),
        }),
      });
      const data = await response.json();
      console.log('Update address desc response:', data);
      if (data && (data.success || data.message === 'Salon address updated successfully')) {
        dispatch(updateAddressAction({
          id: editingAddress.id,
          description: newDescription.trim(),
        }));
        setEditModalVisible(false);
        setEditingAddress(null);
        setNewDescription('');
        // Use safe fallback values in case translations are missing
        Alert.alert(t.editLocation.success.title,t.editLocation.success.message);
      } else {
        throw new Error(data.message || 'Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      Alert.alert(t.editLocation.error.updateAddress);
    }
  };

  const renderAddressItem = ({ item }: { item: Address }) => (
    <Animated.View style={[styles.addressCard, { opacity: fadeAnim }]}>
      <View style={styles.addressHeader}>
        <View style={styles.addressInfo}>
          <Text style={styles.addressTitle}>
            {item.isCurrentLocation ? t.editLocation.currentLocation : item.description}
          </Text>
          {item.isPrimary && (
            <View style={styles.primaryBadge}>
              <Text style={styles.primaryText}>Primary</Text>
            </View>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => handleToggleFavorite(item.id)}
            style={styles.iconButton}
          >
            <Icon 
              name={item.isFavorite ? "favorite" : "favorite-border"} 
              size={24} 
              color={Colors.gold} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEditAddress(item)}
            style={styles.iconButton}
          >
            <Icon name="edit" size={24} color={Colors.gold} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteAddress(item.id)}
            style={styles.iconButton}
          >
            <Icon name="delete" size={24} color={Colors.gold} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => handleSetPrimary(item.id)}
        style={[
          styles.setPrimaryButton,
          item.isPrimary && styles.setPrimaryButtonActive
        ]}
      >
        <Text style={[
          styles.setPrimaryText,
          item.isPrimary && styles.setPrimaryTextActive
        ]}>
          {item.isPrimary ? 'Primary Location' : 'Set asss Primary'}
        </Text>
      </TouchableOpacity> */}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.editLocation.title}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.gold} />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerSubtitle}>{t.editLocation.subtitle}</Text>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.currentLocationButton]}
          onPress={handleCurrentLocation}
          disabled={locationLoading || addressLoading}
        >
          <Icon name="my-location" size={24} color={Colors.white} />
          <Text style={[styles.buttonText, { color: Colors.white }]} numberOfLines={1}>
            {t.editLocation.useCurrentLocation}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.pickOnMapButton]}
          onPress={handleOpenMap}
          disabled={addressLoading}
        >
          <Icon name="map" size={24} color={Colors.white} />
          <Text style={[styles.buttonText, { color: Colors.white }]} numberOfLines={1}>
            {t.editLocation.pickOnMap}
          </Text>
        </TouchableOpacity>
      </View>

      {showMap ? (
        <LocationMapView
          onLocationSelect={handleMapPress}
          onConfirm={handleConfirmLocation}
          onCancel={() => {
            console.log('Map view cancelled');
            setShowMap(false);
            setSelectedLocation(null);
            setInitialMapLocation(null);
          }}
          selectedLocation={selectedLocation}
          initialLocation={initialMapLocation}
          loading={addressLoading}
        />
      ) : (
        <>
          <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
              placeholder={t.editLocation.searchPlaceholder}
        fetchDetails={true}
        onPress={(data, details) => {
                console.log('Place selected:', data);
                console.log('Place details:', details);
                if (details?.geometry?.location) {
                  handleAddAddress(
                    data.description,
                    `https://www.google.com/maps/place/?q=place_id:${details.place_id}`,
                    details.geometry.location.lat,
                    details.geometry.location.lng
                  );
                }
        }}
        textInputProps={{
          placeholderTextColor: Colors.white,
        }}
        query={{
          key: 'AIzaSyB-w38SqAU85WY8NzUDFKw5JX5RakNulaA',
          language: 'ar',
        }}
        styles={{
                container: styles.autocompleteContainer,
          textInput: styles.textInput,
          listView: styles.listView,
                row: styles.autocompleteRow,
                description: styles.autocompleteDescription,
              }}
            />
          </View>

          {(locationLoading || addressLoading) && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.gold} />
          </View>
        )}

          <AddressList
            addresses={user?.addresses || []}
            onDelete={handleDeleteAddress}
            onToggleFavorite={handleToggleFavorite}
            onSetPrimary={handleSetPrimary}
            loading={addressLoading}
            onEdit={handleEditAddress}
          />
        </>
      )}

      {/* Edit Description Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{t.editLocation.editAddress}</Text>

            </View>

            <TextInput
              style={styles.modalInput}
              placeholder={t.editLocation.addressDescription}
              placeholderTextColor={Colors.softGray}
              // value={newDescription}
              onChangeText={setNewDescription}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveDescription}
            >
              <Text style={styles.saveButtonText}>{t.editLocation.save}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    opacity: 0.7,
    alignSelf: 'center',
    // marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    right: 0,
  },
  searchContainer: {
    marginBottom: 20,
  },
  autocompleteContainer: {
    flex: 0,
    backgroundColor: 'transparent',
  },
  textInput: {
    backgroundColor: Colors.black,
    color: Colors.white,
    borderColor: Colors.gold,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
  },
  listView: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  autocompleteRow: {
    backgroundColor: Colors.black,
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
  },
  autocompleteDescription: {
    color: Colors.white,
  },
  addressCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    marginBottom: 5,
  },
  primaryBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  primaryText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 8,
  },
  setPrimaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  setPrimaryButtonActive: {
    backgroundColor: Colors.gold,
  },
  setPrimaryText: {
    color: Colors.gold,
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
  },
  setPrimaryTextActive: {
    color: Colors.black,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
  },
  currentLocationButton: {
    backgroundColor: Colors.gold,
  },
  pickOnMapButton: {
    backgroundColor: Colors.gold,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    marginLeft: 8,
    flexShrink: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 15,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
  },
  closeButton: {
    padding: 5,
  },
  modalInput: {
    backgroundColor: Colors.black,
    color: Colors.white,
    borderColor: Colors.gold,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.gold,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
});
