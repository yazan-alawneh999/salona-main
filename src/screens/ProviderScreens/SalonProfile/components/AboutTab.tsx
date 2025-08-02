import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert, I18nManager} from 'react-native';
import styles from '../SalonProfile.styles';
import {Salon} from '../../../../types/salon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/Colors';
import EditAvailabilityModal from './EditAvailabilityModal';
import BlockTimeModal from './BlockTimeModal';
import CategoriesModal from './CategoriesModal';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface AboutTabProps {
  salon: Salon[];
  salonId: number;
  onAvailabilityUpdate: () => void;
}

const AboutTab: React.FC<AboutTabProps> = ({salon, salonId, onAvailabilityUpdate}) => {
  const { t, isRTL } = useTranslation();
  const [selectedDay, setSelectedDay] = useState<{
    id: number;
    openingTime: string;
    closingTime: string;
    day: string;
  } | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isBlockTimeModalVisible, setIsBlockTimeModalVisible] = useState(false);
  const [isCategoriesModalVisible, setIsCategoriesModalVisible] = useState(false);

  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleEditPress = (availability: any) => {
    setSelectedDay({
      id: availability.id,
      openingTime: availability.opening_time,
      closingTime: availability.closing_time,
      day: availability.day,
    });
    setIsEditModalVisible(true);
  };

  const handleBlockTimePress = (availability: any) => {
    setSelectedDay({
      id: availability.id,
      openingTime: availability.opening_time,
      closingTime: availability.closing_time,
      day: availability.day,
    });
    setIsBlockTimeModalVisible(true);
  };

  const handleChooseCategories = () => {
    setIsCategoriesModalVisible(true);
  };

  const handleSaveCategories = (selectedCategoryIds: number[]) => {
    // Close the modal after saving
    setIsCategoriesModalVisible(false);
  };

  const translateDay = (day: string) => {
    const dayKey = day.toLowerCase() as keyof typeof t.salonProfile.about.days;
    return t.salonProfile.about.days[dayKey];
  };

  useEffect(() => {
    console.log('Salon Addressssss:', salon.about);
  }, [salon]);

  return (
    <ScrollView 
      style={[styles.aboutContainer, isRTL && { direction: 'rtl' }]} 
      showsVerticalScrollIndicator={false}
    >
      {/* <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={handleChooseCategories}>
        <Text style={styles.buttonText}>{t.salonProfile.about.chooseCategories}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[styles.button, { marginBottom: 20, backgroundColor: Colors.gold }]}
        onPress={() => setIsBlockTimeModalVisible(true)}>
        <Text style={[styles.buttonText, { color: Colors.black }]}>{t.salonProfile.blockTime.title}</Text>
      </TouchableOpacity>

      <View style={[styles.row, !isRTL && styles.rowRTL]}>
        <Text style={[styles.label]}>
          {t.salonProfile.about.shopName}:
        </Text>
        <Text style={[styles.value]}>
          {salon?.name || t.salonProfile.about.notAvailable}
        </Text>
      </View>

      <View style={[styles.row, !isRTL && styles.rowRTL]}>
        <Text style={[styles.label, !isRTL && styles.labelRTL]}>
          {t.salonProfile.about.description || 'Description'}:
        </Text>
        <Text style={[styles.value, isRTL && styles.valueRTL]}>
          {salon?.about || t.salonProfile.about.noDescription}
        </Text>
      </View>

      {salon?.availabilities?.map((availability) => (
        <View key={availability.id} style={[styles.row, !isRTL && styles.rowRTL]}>
          <Text style={[styles.label, !isRTL && styles.labelRTL, {textTransform: 'capitalize'}]}>
            {translateDay(availability.day)}:
          </Text>
          <View style={[styles.timeContainer, !isRTL && styles.timeContainerRTL]}>
            <TouchableOpacity
              style={[styles.editButton, isRTL && styles.editButtonRTL]}
              onPress={() => handleEditPress(availability)}>
              <Icon name="edit" size={16} color={Colors.gold} />
            </TouchableOpacity>
            <Text style={[styles.value, isRTL && styles.valueRTL]}>
              {formatTime(availability.opening_time)} - {formatTime(availability.closing_time)}
            </Text>
          </View>
        </View>
      ))}

      {/* <View style={[styles.row, styles.addressContainer, !isRTL && styles.rowRTL]}>
        <Icon name="location-on" size={20} color={Colors.gold} />
        <Text style={[styles.addressText, !isRTL && styles.valueRTL]}>
          {salon?.addresses[0]?.description || t.salonProfile.about.addressNotAvailable}
        </Text>
      </View> */}

      <EditAvailabilityModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        dayId={selectedDay?.id || 0}
        currentOpeningTime={selectedDay?.openingTime || ''}
        currentClosingTime={selectedDay?.closingTime || ''}
        salonId={salonId}
        onSuccess={onAvailabilityUpdate}
      />

      <BlockTimeModal
        visible={isBlockTimeModalVisible}
        onClose={() => setIsBlockTimeModalVisible(false)}
        dayId={selectedDay?.id || 0}
        currentOpeningTime={selectedDay?.openingTime || ''}
        currentClosingTime={selectedDay?.closingTime || ''}
        salonId={salonId}
        onSuccess={onAvailabilityUpdate}
      />

      <CategoriesModal
        visible={isCategoriesModalVisible}
        onClose={() => setIsCategoriesModalVisible(false)}
        onSave={handleSaveCategories}
        initialSelectedCategories={salon?.categories?.map(cat => cat.id) || []}
      />
    </ScrollView>
  );
};

export default AboutTab; 