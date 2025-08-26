import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Booking.styles';
import BookingCard from '../../../components/BookingCard/BookingCard';
// import BeautyServicesSection from '../../../components/BeautyServices/BeautyServices';
import Footer from '../../../components/Footer/Footer';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useGetAppointmentsQuery, useGetAllSalonsQuery} from '../../../redux/api/salonApi';
import {useDispatch} from 'react-redux';
import {setSalons} from '../../../redux/slices/salonSlice';
import { useTranslation } from '../../../contexts/TranslationContext';

interface Appointment {
  id: number;
  appointment_day: string;
  appointment_time: string;
  status: string;
  total_amount: string;
  salon: {
    id: number;
    name: string;
    image_url: string | null;
  };
  services: Array<{
    id: number;
    service: string;
    price: string;
    time: string;
  }>;
}

const BookingsPage = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const initialTab = (route.params && (route.params as any).initialTab) as 'booked' | 'completed' | 'cancelled' | undefined;
  const [activeTab, setActiveTab] = useState<'booked' | 'completed' | 'cancelled'>(initialTab || 'booked');
  const {data: appointmentsData, isLoading, error, refetch} = useGetAppointmentsQuery({ status: activeTab });
  // const {data: salonsData} = useGetAllSalonsQuery();
  // const dispatch = useDispatch();
  const { t, isRTL } = useTranslation();

  // Refetch appointments when activeTab changes
  useEffect(() => {
    refetch();
  }, [activeTab, refetch]);

  // const mappedSalons = useMemo(() => {
  //   return salonsData?.salons.map((salon: any) => ({
  //     id: salon.id.toString(),
  //     title: salon.name,
  //     image: salon.image && salon.image !== null
  //       ? { uri: salon.image }
  //       : require('../../../assets/images/alia-ahmad.png'),
  //   }));
  // }, [salonsData]);

  // useEffect(() => {
  //   if (salonsData) {
  //     dispatch(setSalons(salonsData.salons));
  //   }
  // }, [salonsData, dispatch]);

  const tabs = isRTL ? ['cancelled', 'completed', 'booked'] as const : ['booked', 'completed', 'cancelled'] as const;

  const filteredAppointments = appointmentsData?.appointments || [];

  console.log('Active tab:', activeTab);

  // Add detailed logging for cancelled appointments
  if (activeTab === 'cancelled') {
    // console.log('\n=== CANCELLED APPOINTMENTS API RESPONSE ===');
    // console.log('Raw API Response:', appointmentsData);
    // console.log('Total cancelled appointments:', appointmentsData?.appointments?.length || 0);
    // console.log('Filtered appointments:', filteredAppointments);
    // console.log('Loading state:', isLoading);
    // console.log('Error state:', error);
    
    // Log each cancelled appointment details
    filteredAppointments.forEach((appointment, index) => {
      // console.log(`\nCancelled Appointment #${index + 1}:`);
      // console.log('ID:', appointment.id);
      // console.log('Date:', appointment.appointment_day);
      // console.log('Time:', appointment.appointment_time);
      // console.log('Status:', appointment.status);
      // console.log('Total Amount:', appointment.total_amount);
      // console.log('Salon Details:', {
      //   id: appointment.salon.id,
      //   name: appointment.salon.name,
      //   image: appointment.salon.image_url
      // });
      // console.log('Services:', appointment.services);
    });
    
    // console.log('\n=== END CANCELLED APPOINTMENTS DETAILS ===\n');
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // Convert "08:30:00" to "08:30"
  };

  const handleDetailPress = (appointment: Appointment) => {
    console.log('Navigating to booking details:', appointment.id);
    navigation.navigate('ReviewBookingScreen', {
      booking: appointment,
      isCompleted: activeTab === 'completed',
    });
  };

  if (isLoading) {
    console.log('Rendering loading state');
    return (
      <View style={[styles.loadingContainer, isRTL && styles.loadingContainerRTL]}>
        <ActivityIndicator size="large" color={Colors.gold} />
        <Text style={[styles.loadingText, isRTL && styles.loadingTextRTL]}>
          {t.bookings.loading}
        </Text>
      </View>
    );
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <View style={[styles.loadingContainer, isRTL && styles.loadingContainerRTL]}>
        <Text style={[styles.loadingText, isRTL && styles.loadingTextRTL]}>
          {t.bookings.error}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <ImageBackground
        source={require('../../../assets/images/pink-bg.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <View style={[styles.contentContainer, isRTL && styles.contentContainerRTL]}>
        <View style={[styles.header, !isRTL && styles.headerRTL]}>
          <TouchableOpacity 
            style={[styles.backButton, isRTL && styles.backButtonRTL]} 
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Icon 
              name={isRTL ? "arrow-forward" : "arrow-back"} 
              size={24} 
              color={Colors.white} 
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isRTL && styles.headerTitleRTL]}>
            {t.bookings.title}
          </Text>
        </View>

        <View style={[styles.tabContainer, !isRTL && styles.tabContainerRTL]}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
                isRTL && styles.tabRTL
              ]}
              onPress={() => {
                console.log('Tab pressed:', tab);
                setActiveTab(tab);
              }}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                  isRTL && styles.tabTextRTL
                ]}>
                {t.bookings.tabs[tab as keyof typeof t.bookings.tabs]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredAppointments}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}: {item: Appointment}) => {
            return (
              <BookingCard
                image={
                  item.salon.image_url ||
                  require('../../../assets/images/alia-ahmad.png')
                }
                name={item.salon.name}
                servicesCount={item.services.length}
                price={t.bookings.details.price.replace('{amount}', item.total_amount)}
                time={t.bookings.details.time
                  .replace('{date}', formatDate(item.appointment_day))
                  .replace('{time}', formatTime(item.appointment_time))}
                onDetailPress={() => handleDetailPress(item)}
                isRTL={isRTL}
                translations={{
                  services: t.bookings.details.services.replace('{count}', item.services.length.toString()),
                  detail: t.bookings.actions.detail
                }}
              />
            );
          }}
          contentContainerStyle={[styles.listContainer, isRTL && styles.listContainerRTL]}
          ListEmptyComponent={
            <View style={[styles.emptyContainer, isRTL && styles.emptyContainerRTL]}>
              <Text style={[styles.emptyText, isRTL && styles.emptyTextRTL]}>
                {t.bookings.empty.replace('{status}', t.bookings.tabs[activeTab as keyof typeof t.bookings.tabs])}
              </Text>
            </View>
          }
        />

        {/* <View style={styles.section}>
          <BeautyServicesSection
            title="Our Salons"
            data={mappedSalons || []}
            onViewAllPress={() => navigation.navigate('OurSalonsScreen')}
            onItemPress={(salon) => navigation.navigate('SalonProfileScreen', { salon })}
          />
        </View> */}
      </View>
      <Footer />
    </View>
  );
};

export default BookingsPage;
