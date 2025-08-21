import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ProviderFooter.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from '../../contexts/TranslationContext';

const ProviderFooter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {t, isRTL} = useTranslation();
  
  const footerItems = [
    {
      name: t.providerFooter.notifications,
      icon: 'notifications',
      screen: 'ProviderNotifications',
    },
    {
      name: t.providerFooter.account,
      icon: 'account-circle',
      screen: 'ProviderAccount',
    },
    {
      name: t.providerFooter.bookings,
      icon: 'calendar-today',
      screen: 'ProviderBookingScreen',
    },
    // {name: t.providerFooter.chat, icon: 'chat', screen: 'ProviderChatList'},
    {name: t.providerFooter.profile, icon: 'person', screen: 'ProviderProfile'},
  ];

  const isCurrentScreen = (screenName: string) => {
    return route.name === screenName;
  };

  return (
    <View style={[styles.footerContainer, isRTL && styles.footerContainerRTL]}>
      {footerItems.map((item, index) => {
        const isActive = isCurrentScreen(item.screen);
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.footerItem,
              isActive && styles.activeFooterItem
            ]}
            onPress={() => navigation.navigate(item.screen as never)}>
            <View style={[
              styles.iconContainer,
              isActive && styles.activeIconContainer
            ]}>
              <Icon 
                name={item.icon} 
                size={item.icon === 'account-circle' ? 28 : 20} 
                color={isActive ? Colors.black : Colors.white} 
              />
            </View>
            <Text style={[
              styles.footerLabel,
              isActive && styles.activeFooterLabel
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProviderFooter;
