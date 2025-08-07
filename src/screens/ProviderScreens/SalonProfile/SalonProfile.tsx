import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
  I18nManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {useGetSalonByIdQuery} from '../../../redux/api/salonApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import styles from './SalonProfile.styles';
import modalStyles from './modal.styles';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import ProviderFooter from '../../../components/ProviderFooter/ProviderFooter';
import DateSelectionModal from '../../../components/BookingCalendar/DateSelectionModal';
import AddServiceModal from '../../../components/AddServiceModal/AddServiceModal';
import EditServiceModal from '../../../components/EditServiceModal/EditServiceModal';
import {useSalonServices} from './hooks/useSalonServices';
import AboutTab from './components/AboutTab';
import ServicesTab from './components/ServicesTab';
import PortfolioTab from './components/PortfolioTab';
import ReviewsTab from './components/ReviewsTab';
import {useSalonPackages} from './hooks/useSalonPackages';
import PackagesTab from './components/PackagesTab';
import AddPackageModal from '../../../components/AddPackageModal/AddPackageModal';
import EditPackageModal from '../../../components/EditPackageModal/EditPackageModal';
import {Service} from '../../../types/salon';
import {useTranslation} from '../../../contexts/TranslationContext';

const ProviderSalonProfileScreen = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: RootState) => state.auth);
  const {t, isRTL} = useTranslation();
  const salonId = user?.id;

  if (!salonId) {
    console.error('Salon ID is undefined');
    return null;
  }

  const {data: salonData, refetch} = useGetSalonByIdQuery(salonId);
  const [activeTab, setActiveTab] = useState('About');
  const [modalVisible, setModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const {
    selectedServices,
    handleEditService,
    handleDeleteService,
    handleAddService,
    toggleService,
  } = useSalonServices(salonId, salonData);

  const {
    selectedPackages,
    handleEditPackage,
    handleDeletePackage,
    handleAddPackage,
    togglePackage,
  } = useSalonPackages(salonId, salonData);

  const [isAddPackageModalVisible, setAddPackageModalVisible] = useState(false);
  const [isEditPackageModalVisible, setEditPackageModalVisible] =
    useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const handleEditServicePress = (service: any) => {
    setSelectedService(service);
    setEditModalVisible(true);
  };

  const handleAddServicePress = () => {
    setAddModalVisible(true);
  };

  const handleModalClose = () => {
    setAddModalVisible(false);
  };

  const handleNotificationPress = () => {
    navigation.navigate('ProviderNotifications');
  };

  const calculateTotal = () => {
    const serviceFees = 2;
    const totalPrice = Object.values(selectedServices).reduce(
      (sum: number, service: Service) => sum + Number(service.price),
      0,
    );
    return {serviceFees, totalPrice: totalPrice + serviceFees};
  };

  const handleEditPackagePress = (pkg: any) => {
    setSelectedPackage(pkg);
    setEditPackageModalVisible(true);
  };

  const handleAddPackagePress = () => {
    setAddPackageModalVisible(true);
  };

  const handlePackageModalClose = () => {
    setAddPackageModalVisible(false);
  };

  const handleAvailabilityUpdate = () => {
    // Refetch salon data to get updated availability
    refetch();
  };

  const renderContent = () => {
    if (!salonData?.salons) return null;

    switch (activeTab) {
      case 'About':
        return (
          <AboutTab
            salon={salonData.salons}
            salonId={salonId}
            onAvailabilityUpdate={handleAvailabilityUpdate}
          />
        );
      case 'Services':
        return (
          <ServicesTab
            services={salonData.salons.services}
            selectedServices={selectedServices}
            onAddService={handleAddServicePress}
            onToggleService={toggleService}
            onEditService={handleEditServicePress}
            onDeleteService={handleDeleteService}
            onContinue={() => setModalVisible(true)}
          />
        );
      case 'Packages':
        return (
          <PackagesTab
            packages={salonData.salons.packages}
            selectedPackages={selectedPackages}
            onAddPackage={handleAddPackagePress}
            onTogglePackage={togglePackage}
            onEditPackage={handleEditPackagePress}
            onDeletePackage={handleDeletePackage}
            onContinue={() => setModalVisible(true)}
          />
        );
      case 'Portfolio':
        return (
          <PortfolioTab
            assets={salonData.salons.assets}
            onAssetsUpdated={refetch}
          />
        );
      case 'Reviews':
        return <ReviewsTab reviews={salonData.salons.ratings_received} />;
      default:
        return null;
    }
  };

  const renderModal = () => {
    const {serviceFees, totalPrice} = calculateTotal();
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>
            {t.salonProfile.services.added}
          </Text>
          <FlatList
            data={Object.values(selectedServices)}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}: any) => (
              <View style={modalStyles.serviceItem}>
                <View>
                  <Text style={modalStyles.serviceName}>{item.name}</Text>
                  <Text style={modalStyles.serviceDuration}>
                    {t.salonProfile.services.duration}: {item.duration}
                  </Text>
                </View>
                <Text style={modalStyles.servicePrice}>
                  {item.price} {t.salonProfile.services.price}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleService(item.id, item)}
                  style={modalStyles.removeButton}>
                  <Text style={modalStyles.removeButtonText}>
                    {t.salonProfile.services.remove}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={
              <View>
                <View style={modalStyles.summary}>
                  <Text style={modalStyles.summaryText}>
                    {t.salonProfile.services.serviceFees}: {serviceFees}{' '}
                    {t.salonProfile.services.price}
                  </Text>
                  <Text style={modalStyles.summaryText}>
                    {t.salonProfile.services.total}: {totalPrice}
                  </Text>
                </View>
                <TouchableOpacity
                  style={modalStyles.continueButton}
                  onPress={() => {
                    setModalVisible(false);
                    setDateModalVisible(true);
                  }}>
                  <Text style={modalStyles.continueButtonText}>
                    {t.salonProfile.services.continue}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, isRTL && {direction: 'rtl'}]}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>{t.salonProfile.welcome}</Text>
            <Text style={styles.nameText}>{user?.name || 'Provider'}</Text>
          </View>

          <Image
            source={require('../../../assets/images/prettyLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleNotificationPress}>
            <Icon name="notifications" size={24} color={Colors.gold} />
          </TouchableOpacity>
        </View>

        <ProfileHeader
          image={salonData?.salons?.image_url}
          name={salonData?.salons?.name || ''}
          title={t.salonProfile.salonType}
          rating={salonData?.salons?.ratings_received?.[0]?.rate || 0}
          reviews={salonData?.salons?.ratings_received?.length || 0}
          back={false}
          onBackPress={() => navigation.goBack()}
          onFavoritePress={() => console.log(t.salonProfile.addToFavorites)}
          isProvider={false}
        />

        <View style={styles.tabs}>
          {[
            {key: 'About', label: t.salonProfile.tabs.about},
            {key: 'Services', label: t.salonProfile.tabs.services},
            {key: 'Packages', label: t.salonProfile.tabs.packages},
            {key: 'Portfolio', label: t.salonProfile.tabs.portfolio},
            {key: 'Reviews', label: t.salonProfile.tabs.reviews},
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>{renderContent()}</View>
        {renderModal()}

        <DateSelectionModal
          visible={dateModalVisible}
          onClose={() => setDateModalVisible(false)}
          onDateSelected={() => {
            setDateModalVisible(false);
            console.log('Proceed to next step with selected date and time');
          }}
        />

        <AddServiceModal
          visible={isAddModalVisible}
          onClose={handleModalClose}
          onSubmit={handleAddService}
          title={t.salonProfile.modals.addService}
          submitText={t.salonProfile.modals.submit}
          closeText={t.salonProfile.modals.close}
        />

        <EditServiceModal
          visible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSubmit={data => handleEditService(selectedService.id, data)}
          defaultValues={
            selectedService
              ? {
                  name: selectedService.service,
                  description: selectedService.description,
                  price: selectedService.price,
                  time: selectedService.time,
                }
              : undefined
          }
        />

        <AddPackageModal
          visible={isAddPackageModalVisible}
          onClose={handlePackageModalClose}
          onSubmit={handleAddPackage}
          availableServices={salonData?.salons?.services || []}
          title={t.salonProfile.modals.addPackage}
          submitText={t.salonProfile.modals.submit}
          closeText={t.salonProfile.modals.close}
        />

        {selectedPackage && (
          <EditPackageModal
            visible={isEditPackageModalVisible}
            onClose={() => {
              setEditPackageModalVisible(false);
              setSelectedPackage(null);
            }}
            onSubmit={data => handleEditPackage(selectedPackage.id, data)}
            availableServices={salonData?.salons?.services || []}
            defaultValues={selectedPackage}
            title={t.salonProfile.modals.editPackage}
            submitText={t.salonProfile.modals.submit}
            closeText={t.salonProfile.modals.close}
          />
        )}
      </ScrollView>
      <ProviderFooter />
    </View>
  );
};

export default ProviderSalonProfileScreen;
