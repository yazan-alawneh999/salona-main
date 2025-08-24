import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useTranslation } from '../../contexts/TranslationContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NotificationCardProps {
  icon: string;
  category: string;
  message: string;
  time: string;
  isUnread?: boolean;
  data?: string;
  onPress?: () => void;
  title_ar?: string;
  title_en?: string;
  message_ar?: string;
  message_en?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  icon,
  category,
  message,
  time,
  isUnread = false,
  data,
  onPress,
  title_ar,
  title_en,
  message_ar,
  message_en,
}) => {
  const {t, isRTL } = useTranslation();

  // Log the notification data
  console.log('Notification Data:', {
    category,
    message,
    title_ar,
    title_en,
    message_ar,
    message_en,
    isRTL,
    data
  });

  // Select the appropriate title and message based on RTL
  const displayTitle = isRTL ? title_ar : title_en;
  const displayMessage = isRTL ? message_ar : message_en;

  // Parse the data string to get cancel reason (if available)
  const parsedData = data ? (() => {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse notification data:', e);
      return null;
    }
  })() : null;
  const cancelReason = parsedData?.cancel_reason;

  return (
    <TouchableOpacity
      style={[styles.container, isUnread && styles.unreadContainer]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={Colors.gold} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.category}>{displayTitle || category}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {displayMessage || message}
        </Text>
        {cancelReason && (
          <View style={styles.cancelReasonContainer}>
            <Text style={styles.cancelReasonText}>{t.notifications.cancellationReason}: {cancelReason}</Text>
          </View>
        )}
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  unreadContainer: {
    borderWidth: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(227, 118, 115, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
  },
  cancelReasonContainer: {
    borderWidth: 1,
    borderColor: Colors.gold,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  cancelReasonText: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    fontStyle: 'italic',
  },
});

export default NotificationCard;
