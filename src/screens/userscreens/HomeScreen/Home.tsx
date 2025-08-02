import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
  Platform,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors';
import styles from './Home.styles';
import BeautyServicesSection from '../../../components/BeautyServices/BeautyServices';
import Footer from '../../../components/Footer/Footer';
import {Link, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setSalons, setSelectedAddress} from '../../../redux/slices/salonSlice';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Salon} from '../../../types/salon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from '../../../contexts/TranslationContext';
import {useGetAllSalonsQuery} from '../../../redux/api/salonApi';
import {Package} from '../../../components/PackagesSection/PackagesSection';
import messaging from '@react-native-firebase/messaging';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {useLocation} from '../../userscreens/EditLocation/hooks/useLocation';
import SearchBarWithMenu from '../../../components/SearchBarWithMenu/SearchBarWithMenu';
import {Address} from '../../userscreens/EditLocation/types';

interface ExtendedSalon extends Salon {
  working_hours?: any[];
  latitude?: number;
  longitude?: number;
  deleted_at?: string | null;
  is_verified?: boolean;
}

type SalonResponse = {
  salons: Salon[];
};

interface MappedSalon {
  id: string;
  title: string;
  image: any;
  distance?: string;
  time?: string;
  rating?: string;
  isService?: boolean;
}

type RootStackParamList = {
  UserChatListScreen: undefined;
  OurSalonsScreen: {category_id?: number};
  SalonProfileScreen: {
    salon: {
      id: number;
      name: string;
      image: string;
    };
    initialTab?: string;
  };
  NotificationsScreen: undefined;
  ExploreScreen: {filters: {categories: string[]}};
  EditLocationScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NearbySalon {
  id: number;
  name: string;
  description: string;
  salon_latitude: string;
  salon_longitude: string;
  distance: number;
  image_url: string | null;
  rating_avg: any;
  travelTime?: string;
}

interface NearbySalonsResponse {
  success: boolean;
  salons: NearbySalon[];
}

// Transform NearbySalon to match Salon type
const mapNearbySalonToSalon = (nearbySalon: NearbySalon): ExtendedSalon => {
  return {
    id: nearbySalon.id,
    name: nearbySalon.name,
    image_url: nearbySalon.image_url,
    latitude: parseFloat(nearbySalon.salon_latitude),
    longitude: parseFloat(nearbySalon.salon_longitude),
    email: '',
    avatar: null,
    address: '',
    bio: '',
    working_hours: [],
    ratings_received: [],
    categories: [],
    services: [],
    packages: [],
    created_at: '',
    updated_at: '',
    deleted_at: null,
    is_active: 1,
    is_verified: true,
    verification_code: null,
  };
};

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  image_url: string;
  created_at: string | null;
  updated_at: string | null;
}

interface CategoriesResponse {
  success: boolean;
  categories: Category[];
}

interface PackagesResponse {
  success: boolean;
  packages: {
    data: Package[];
  };
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const {t, isRTL} = useTranslation();
  const [nearbySalons, setNearbySalons] = useState<NearbySalon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const {getCurrentLocation, requestLocationPermission} = useLocation();
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const selectedAddress = useSelector(
    (state: RootState) => state.salons.selectedAddress,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const {data: salonsData, isLoading: salonsLoading} = useGetAllSalonsQuery({});

  const getAndSetCurrentLocation = async () => {
    console.log('selected address mother', selectedAddress);

    try {
      const granted = await requestLocationPermission();
      if (granted) {
        const location = await getCurrentLocation();
        if (location) {
          setCurrentLocation({lat: location.latitude, lng: location.longitude});
        } else {
          console.error('Failed to get location from device');
        }
      } else {
        console.warn('Location permission not granted');
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const fetchNearbySalons = async (latitude: number, longitude: number) => {
    try {
      console.log('fetching nearby salons');
      console.log('latitude', latitude);
      console.log('longitude', longitude);
      console.log('selected address latitude', selectedAddress?.latitude);
      console.log('selected address longitude', selectedAddress?.longitude);
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        `https://spa.dev2.prodevr.com/api/nearby-salons?latitude=${latitude}&longitude=${longitude}&radius=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data: NearbySalonsResponse = await response.json();
      console.log('Nearby salons response:', data);

      if (data.success) {
        // Get travel times for each salon
        const salonsWithTravelTime = await Promise.all(
          data.salons.map(async salon => {
            try {
              const distanceResponse = await fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${salon.salon_latitude},${salon.salon_longitude}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`,
              );
              const distanceData = await distanceResponse.json();

              if (distanceData.rows[0]?.elements[0]?.duration?.text) {
                return {
                  ...salon,
                  travelTime: distanceData.rows[0].elements[0].duration.text,
                };
              }
              return salon;
            } catch (error) {
              console.error('Error fetching travel time:', error);
              return salon;
            }
          }),
        );

        setNearbySalons(salonsWithTravelTime);
        // Transform nearby salons to match Salon type before dispatching
        dispatch(setSalons(salonsWithTravelTime.map(mapNearbySalonToSalon)));
      } else {
        console.error('Failed to fetch nearby salons');
      }
    } catch (error) {
      console.error('Error fetching nearby salons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mappedSalons = useMemo(() => {
    return nearbySalons.map((salon: any): MappedSalon => {
      const distanceText =
        salon.distance < 1
          ? `${Math.round(salon.distance * 1000)}m`
          : `${salon.distance.toFixed(1)} km`;

      return {
        id: salon.id.toString(),
        title: salon.name,
        image: salon.image_url
          ? {uri: salon.image_url}
          : require('../../../assets/images/alia-ahmad.png'),
        distance: distanceText,
        time: salon.travelTime || undefined,
        rating: salon.average_rating || '0.0',
      };
    });
  }, [nearbySalons]);

  const handleNotificationPress = () => {
    navigation.navigate('NotificationsScreen');
  };

  const handleChatPress = () => {
    console.log('Navigating to UserChatListScreen');
    navigation.navigate('UserChatListScreen');
  };

  const fetchPackages = async () => {
    try {
      setPackagesLoading(true);
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        'https://spa.dev2.prodevr.com/api/salons/get-package',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const data: PackagesResponse = await response.json();

      if (data.success && data.packages) {
        setPackages(data.packages.data);
        console.log(`packages`);
        console.log(data.packages.data);
      } else {
        console.error('Failed to fetch packages:', data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setPackagesLoading(false);
    }
  };

  const handleGoSearch = useCallback(() => {
    navigation.navigate('ExploreScreen');
  });
  const handleGoFilter = useCallback(() => {
    navigation.navigate('FilterScreen');
  });

  const handlePackagePress = (packageItem: Package) => {
    const salon = packageItem.salon || {
      id: packageItem.salon_id,
      name: packageItem.salon_name,
      image_url: packageItem.salon_image,
    };

    navigation.navigate('SalonProfileScreen', {
      salon,
      initialTab: 'Packages',
    });
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        'https://spa.dev2.prodevr.com/api/categories',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data: CategoriesResponse = await response.json();

      if (data.success) {
        setCategories(data.categories);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchUserAddresses = async () => {
    try {
      setIsLoadingAddresses(true);
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        'https://spa.dev2.prodevr.com/api/addresses',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log('Fetched addresses:', data);
      if (data.success) {
        setUserAddresses(data.addresses);
        // Find the primary address
        const primaryAddress = data.addresses.find(
          addr => addr.is_primary === 1,
        );
        if (primaryAddress) {
          dispatch(setSelectedAddress(primaryAddress));
        } else if (data.addresses.length === 0) {
          // If no addresses exist, get current location and add it
          console.log('No addresses found, getting current location...');
          const granted = await requestLocationPermission();
          if (granted) {
            const location = await getCurrentLocation();
            if (location) {
              console.log('Current location received:', location);
              // Get address from coordinates
              const geocodeResponse = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_API_KEY}`,
              );
              const geocodeData = await geocodeResponse.json();
              console.log('Geocoding response:', geocodeData);

              if (geocodeData.results && geocodeData.results[0]) {
                console.log('Adding current location as address...');
                const addressResponse = await fetch(
                  'https://spa.dev2.prodevr.com/api/new-address',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/json',
                    },
                    body: JSON.stringify({
                      description: geocodeData.results[0].formatted_address,
                      is_favorite: false,
                      latitude: location.latitude.toString(),
                      longitude: location.longitude.toString(),
                    }),
                  },
                );

                const responseText = await addressResponse.text();
                console.log('Raw response:', responseText);

                if (!addressResponse.ok) {
                  throw new Error(
                    `Failed to add address: ${addressResponse.status} ${responseText}`,
                  );
                }

                let addressData;
                try {
                  addressData = JSON.parse(responseText);
                  console.log('Parsed response:', addressData);
                } catch (parseError) {
                  console.error('Error parsing response:', parseError);
                  throw new Error('Invalid response from server');
                }

                if (!addressData.address?.id) {
                  throw new Error(
                    'Invalid response format: missing address ID',
                  );
                }

                const newAddress = {
                  id: addressData.address.id,
                  description: geocodeData.results[0].formatted_address,
                  locationLink: `https://www.google.com/maps/place/?q=place_id:${geocodeData.results[0].place_id}`,
                  isFavorite: false,
                  isPrimary: true,
                  latitude: location.latitude,
                  longitude: location.longitude,
                };

                // Update the addresses list and set as selected
                setUserAddresses([newAddress]);
                dispatch(setSelectedAddress(newAddress));

                // Make it the primary address
                const primaryResponse = await fetch(
                  `https://spa.dev2.prodevr.com/api/update-primary-address/${newAddress.id}`,
                  {
                    method: 'PUT',
                    headers: {
                      Accept: 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                const primaryData = await primaryResponse.json();
                console.log('Set primary address response:', primaryData);
              }
            }
          }
        }
      } else {
        console.error('Failed to fetch addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleAddressSelect = async address => {
    dispatch(setSelectedAddress(address));
    setIsAddressModalVisible(false);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No authentication token found');
        return;
      }
      const response = await fetch(
        `https://spa.dev2.prodevr.com/api/update-primary-address/${address.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log('Update primary address response:', data);
      console.log('Address selected:');
    } catch (error) {
      console.error('Error updating primary address:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('ExploreScreen', {
        filters: {
          search: searchQuery.trim(),
          categories: [],
        },
      });
    }
  };

  const handleMenuPress = () => {
    console.log('Menu button pressed');
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.log('Notification permission not granted');
      }
    } else {
      // For Android, just request the permission directly without custom dialog
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (err) {
        console.warn('Error requesting notification permission:', err);
      }
    }
  };

  useEffect(() => {
    console.log('Requesting location on Home screen...');
    getAndSetCurrentLocation();
    if (selectedAddress) {
      fetchNearbySalons(selectedAddress.latitude, selectedAddress.longitude);
    }
    fetchCategories();
    requestUserPermission();
    fetchUserAddresses();
  }, []);

  useEffect(() => {
    if (
      selectedAddress &&
      selectedAddress.latitude &&
      selectedAddress.longitude
    ) {
      fetchNearbySalons(selectedAddress.latitude, selectedAddress.longitude);
    }
  }, [selectedAddress]);

  // Add navigation focus listener to refetch addresses
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserAddresses();
    });
    return unsubscribe;
  }, [navigation]);

  const isLoadingAny =
    isLoading || packagesLoading || categoriesLoading || salonsLoading;

  // src/constants/images.js
  const itemImages = [
    require('../../../assets/images/br1.jpg'),
    require('../../../assets/images/br2.jpg'),
    require('../../../assets/images/br3.jpg'),
  ];

  const getRandomImage = (): string => {
    const index = Math.floor(Math.random() * itemImages.length);
    return itemImages[index];
  };
  const PackageItem = ({package: pkg}: {package: Package}) => {
    const image = getRandomImage();

    return (
      <View style={styles.featuredSection}>
        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.9}
          // onPress={() => router.push(`/recipe/${pkg.id}`)}
        >
          <View style={styles.featuredImageContainer}>
            <Image
              source={image}
              style={styles.featuredImage}
              resizeMode="cover"
              transition={500}
            />

            <View style={styles.featuredOverlay}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>
                  {pkg.discount_percentage} %
                </Text>
              </View>

              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle} numberOfLines={2}>
                  {pkg.name}
                </Text>

                <View style={styles.featuredMeta}>
                  <View style={styles.metaItem}>
                    <Icon name="time-outline" size={16} color={Colors.black} />
                    <Text style={styles.metaText}>
                      {pkg.time} {t.home.min}
                    </Text>
                  </View>

                  {/* <View style={styles.metaItem}>
                    {/* <Text style={styles.metaText}>{pkg.description}</Text> 
                    <Text style={styles.metaText}>{pkg.description}</Text>
                  </View> */}
                  <View style={styles.metaItem}>
                    {/* //{' '}
                    <Icon
                      name="location-outline"
                      size={16}
                      color={Colors.black}
                    /> */}
                    <Text style={styles.metaText} numberOfLines={2}>
                      {pkg.description}
                    </Text>
                  </View>

                  {/* Uncomment this block if needed */}
                  {/* {pkg.area && (
                  <View style={styles.metaItem}>
                    // <Icon name="location-outline" size={16} color={Colors.black} />
                    <Text style={styles.metaText}>{pkg.area}</Text>
                  </View>
                )} */}
                </View>
                <View style={styles.metaItem}>
                  {/* <Icon
                    name="location-outline"
                    size={16}
                    color={Colors.black}
                  /> */}
                  <Text style={styles.metaText}>
                    {pkg.amount} {t.home.currency}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <TouchableOpacity
          style={styles.searchField}
          onPress={handleGoSearch}
          activeOpacity={0.9}>
          <Icon
            style={styles.searchIcon}
            name="search-outline"
            size={20}
            color={Colors.gold}
          />
          <TextInput
            style={styles.input}
            placeholder={t.home.search_here}
            editable={false} // prevent typing
            pointerEvents="none" // prevent touch
          />
        </TouchableOpacity>
        {/* <Link href={'/(modal)/filter'} asChild> */}
        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.9}
          onPress={handleGoFilter}>
          <Icon name="options-outline" size={26} color={Colors.gold} />
        </TouchableOpacity>
        {/* </Link> */}
      </View>
    </View>
  );

  // const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.locationTxt}>{t.home.location}</Text>
          <View style={[styles.header, isRTL && styles.headerRTL]}>
            <TouchableOpacity
              style={[
                styles.addressButton,
                !isRTL && styles.addressButtonNotRTL,
              ]}
              // onPress={() => setIsAddressModalVisible(true)}>
              onPress={openModal}>
              <View
                style={[
                  styles.addressTextHolder,
                  !isRTL && styles.addressTextHolderNotRTL,
                ]}>
                <Text style={styles.addressTextPlaceholder}>{t.home.amAt}</Text>
                <Text style={styles.addressText} numberOfLines={1}>
                  {selectedAddress ? selectedAddress.description : ''}
                </Text>
                <Icon name="chevron-down" size={20} color={Colors.black} />
              </View>
              <Icon name="location-sharp" size={18} color={Colors.black} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationIconContainer}
              onPress={() => navigation.navigate('NotificationsScreen')}>
              <Icon name="notifications" size={20} color={Colors.black} />
            </TouchableOpacity>
            {/* <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>{t.home.welcome}</Text>
              <Text style={styles.nameText}>{user?.name || ''}</Text>
            </View> */}
          </View>
          <SearchBar />
        </View>

        {/* Address Selection Modal */}
        <Modal
          visible={isAddressModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsAddressModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t.home.selectAddress}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsAddressModalVisible(false)}>
                  <Icon name="close" size={24} color={Colors.gold} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.addAddressButton}
                onPress={() => {
                  setIsAddressModalVisible(false);
                  navigation.navigate('EditLocationScreen');
                }}>
                <Icon name="add-location" size={20} color={Colors.gold} />
                <Text style={styles.addAddressText}>Add Address</Text>
              </TouchableOpacity>

              {isLoadingAddresses ? (
                <ActivityIndicator size="large" color={Colors.gold} />
              ) : (
                <FlatList
                  data={userAddresses}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.addressItem,
                        selectedAddress?.id === item.id &&
                          styles.selectedAddressItem,
                      ]}
                      onPress={() => handleAddressSelect(item)}>
                      <View style={styles.addressItemContent}>
                        <Icon
                          name="location-on"
                          size={20}
                          color={
                            selectedAddress?.id === item.id
                              ? Colors.black
                              : Colors.gold
                          }
                        />
                        <View style={styles.addressItemText}>
                          <Text
                            style={[
                              styles.addressItemTitle,
                              selectedAddress?.id === item.id &&
                                styles.selectedAddressText,
                            ]}>
                            {item.description}
                          </Text>
                          {item.isPrimary && (
                            <View style={styles.primaryBadge}>
                              <Text style={styles.primaryBadgeText}>
                                {t.home.primary}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.addressList}
                />
              )}
            </View>
          </View>
        </Modal>
        {/* <BottomSheet ref={bottomSheetRef} /> */}
        {isLoadingAny ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.gold} />
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.sectionSpacing}>
              {/* <SwiperComponent /> */}
            </View>
            {/* 
            <View style={styles.sectionSpacing2}>
              <TouchableOpacity
                style={styles.notificationIconContainer}
                onPress={() => navigation.navigate('NotificationsScreen')}>
                <Icon name="notifications" size={20} color={Colors.black} />
              </TouchableOpacity>
            </View> */}
            {/* offers */}
            <View style={styles.sectionSpacing2}>
              <Text style={styles.sectionTitle}>{t.home.offers}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}>
                {packages.length > 0 ? (
                  <FlatList
                    data={packages}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <PackageItem package={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <Text style={styles.serviceTitle}>
                    {t.home.noCategoriesAvailable}
                  </Text>
                )}
              </ScrollView>
            </View>
            {/* categories */}

            <View style={styles.sectionSpacing2}>
              <Text style={styles.sectionTitle}>{t.home.ourCategories}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}>
                {categories.length > 0 ? (
                  categories.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={styles.serviceItem}
                      onPress={() =>
                        navigation.navigate('ExploreScreen', {
                          filters: {
                            categories: [category.id.toString()],
                            initialTab: 'Services',
                          },
                        })
                      }>
                      <Image
                        source={
                          category.image_url
                            ? {uri: category.image_url}
                            : require('../../../assets/images/prettyLogo.png')
                        }
                        style={styles.serviceImage}
                      />
                      <Text style={styles.serviceTitle}>{category.name}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.serviceTitle}>
                    {t.home.noCategoriesAvailable}
                  </Text>
                )}
              </ScrollView>
            </View>

            <View style={styles.sectionSpacing2}>
              <BeautyServicesSection
                title={t.home.nearbySalons}
                data={mappedSalons.slice(0, 4)}
                onItemPress={salon =>
                  navigation.navigate('SalonProfileScreen', {
                    salon,
                    initialTab: 'Services',
                  })
                }
                onViewAllPress={() =>
                  navigation.navigate('ExploreScreen', {
                    filters: {categories: []},
                  })
                }
              />
            </View>

            {/* <View style={styles.sectionSpacing2}>
              <PackagesSection
                title={<Text style={styles.sectionTitle}>{t.home.packages}</Text>}
                data={packages}
                onItemPress={handlePackagePress}
              />
            </View> */}
          </ScrollView>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default HomeScreen;
