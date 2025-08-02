import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styles from './Footer.styles';
import Colors from '../../constants/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from '../../contexts/TranslationContext';

interface FooterItem {
  name: string; 
  label: string; 
  navigateTo: string; 
}

const Footer: React.FC = () => {
  const navigation = useNavigation(); 
  const route = useRoute();
  const {t, isRTL} = useTranslation();
  
  const footerItems: FooterItem[] = [
    {name: 'notifications', label: t.footer.notifications, navigateTo: 'NotificationsScreen'}, 
    {name: 'receipt', label: t.footer.bookings, navigateTo: 'BookingScreen'},
    {name: 'home', label: t.footer.home, navigateTo: 'HomeScreen'},
    {
      name: 'favorite',
      label: t.footer.favorites,
      navigateTo: 'FavoritesScreen',
    },
    {name: 'person', label: t.footer.account, navigateTo: 'AccountScreen'},
  ];

  const handleNavigation = (route: string) => {
    navigation.navigate(route as never); 
  };

  return (
    <View style={[styles.footerContainer, !isRTL && styles.footerContainerRTL]}>
      {footerItems.map((item, index) => {
        const isActive = route.name === item.navigateTo;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.footerItem,
              isActive && styles.footerItemActive
            ]}
            onPress={() => handleNavigation(item.navigateTo)}>
            <Icon 
              name={item.name} 
              size={24} 
              color={isActive ? Colors.gold : Colors.white} 
            />
            <Text style={[
              styles.footerLabel,
              isActive && styles.footerLabelActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;
