import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ProviderFooter.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from '../../contexts/TranslationContext';

const ProviderFooter = () => {
  const navigation = useNavigation();
  const {t, isRTL} = useTranslation();
  const footerItems = [
    {
      name: t.providerFooter.notifications,
      icon: 'notifications',
      screen: 'ProviderNotifications',
    },
    {
      name: t.providerFooter.bookings,
      icon: 'calendar-today',
      screen: 'ProviderBookingScreen',
    },
    // {name: t.providerFooter.chat, icon: 'chat', screen: 'ProviderChatList'},
    {
      name: t.providerFooter.account,
      icon: 'account-circle',
      screen: 'ProviderAccount',
    },
    {name: t.providerFooter.profile, icon: 'person', screen: 'ProviderProfile'},
  ];

  return (
    <View style={[styles.footerContainer, isRTL && styles.footerContainerRTL]}>
      {footerItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.footerItem}
          onPress={() => navigation.navigate(item.screen as never)}>
          <Icon name={item.icon} size={24} color={Colors.white} />
          <Text style={styles.footerLabel}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProviderFooter;
