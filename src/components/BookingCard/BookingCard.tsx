import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './BookingCard.styles';
import {ImageSourcePropType} from 'react-native';
import MaybeYouLikeSection from '../MaybeYouLikeSection/MaybeYouLikeSection';
import { useTranslation } from '../../contexts/TranslationContext';
import { format, parseISO } from 'date-fns';

interface BookingCardProps {
  image: ImageSourcePropType | string;
  name: string;
  servicesCount: number;
  price: string;
  time: string;
  onDetailPress: () => void;
  isRTL?: boolean;
  isRead?: boolean;
  translations?: {
    services: string;
    detail: string;
  };
}

const BookingCard: React.FC<BookingCardProps> = ({
  image,
  name,
  servicesCount,
  price,
  time,
  onDetailPress,
  translations,
  isRead = true
}) => {
  const { t , isRTL } = useTranslation();
  
  // Use provided translations or fall back to context translations
  const servicesText = translations?.services || 
    t.bookings.details.services.replace('{count}', servicesCount.toString());
  const detailText = translations?.detail || t.bookings.actions.detail;

  // Handle image source based on type
  const imageSource = typeof image === 'string' 
    ? { uri: image }
    : image;

  // Format the time prop
  let formattedTime = time;
  if (typeof time === 'string' && (time.includes('{date}') || time.includes('{time}'))) {
    // Remove placeholders if present
    formattedTime = time.replace('{date}', '').replace('{time}', '').replace(/\s+at\s+/, ' ').trim();
  } else {
    try {
      const dateObj = parseISO(time);
      const formattedDate = format(dateObj, 'MMMM d, yyyy');
      const formattedHour = format(dateObj, 'hh:mm a');
      const dayName = format(dateObj, 'EEEE');
      formattedTime = `${formattedDate} (${dayName}) at ${formattedHour}`;
    } catch (e) {
      // fallback to original time string
    }
  }

  return (
    <View style={[styles.cardContainer, isRTL && styles.cardContainerRTL]}>
      {!isRead && <View style={styles.unreadIndicator} />}
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource}
          style={styles.image} 
        />
      </View>
    
      <View style={[styles.infoContainer, isRTL && styles.infoContainerRTL]}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.details}>{servicesText}</Text>
        <Text style={styles.details}>{price}</Text>
        <Text style={styles.time} numberOfLines={2}>
          {formattedTime}
        </Text>
        <TouchableOpacity style={styles.detailButton} onPress={onDetailPress}>
          <Text style={styles.detailButtonText}>{detailText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingCard;
