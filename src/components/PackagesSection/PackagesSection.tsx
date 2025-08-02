import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  I18nManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import { useTranslation } from '../../contexts/TranslationContext';

export interface Package {
  id: number;
  name: string;
  description: string;
  amount: string;
  time: string;
  salon_id: number;
  salon_name: string;
  salon_image: string;
  salon?: {
    id: number;
    name: string;
    image_url: string;
  };
}

interface PackagesSectionProps {
  title: string | React.ReactElement;
  data: Package[];
  onViewAllPress?: () => void;
  onItemPress?: (item: Package) => void;
}

const PackagesSection: React.FC<PackagesSectionProps> = ({
  title,
  data,
  onViewAllPress,
  onItemPress,
}) => {
  const navigation = useNavigation();
  const { t, isRTL } = useTranslation();

  // const handlePackagePress = (packageItem: Package) => {
  //   navigation.navigate('SalonProfileScreen', {
  //     salon: {
  //       id: packageItem.salon_id,
  //       name: packageItem.salon_name,
  //       image: packageItem.salon_image,
  //     },
  //     initialTab: 'Packages',
  //   });
  // };

  const renderDiscountBadge = (discount: number) => {
    if (!discount) return null;
    return (
      <View style={styles.discountBadgeContainer}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountAmount}>{discount}% OFF</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.sectionTitle}>{t.home.packagesTitle}</Text> */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress}>
            <Text style={styles.viewAll}>{t.home.viewAll}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { flexDirection: isRTL ? 'row' : 'row' }
        ]}>
        {data.map((item, index) => (
          <View key={index} style={styles.packageCardWrapper}>
            {renderDiscountBadge(70)}
            <TouchableOpacity
              style={[
                styles.packageCard,
                { marginLeft: isRTL ? 0 : 0, marginRight: isRTL ? 0 : 0 }
              ]}
              onPress={() => onItemPress && onItemPress(item)}>
              <Image
                source={
                  item.salon?.image_url
                    ? { uri: item.salon.image_url }
                    : require('../../assets/images/beautician3.png')
                }
                style={styles.salonImage}
              />
              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>{item.name}</Text>
                <Text style={styles.salonName}>{item.salon?.name || ''}</Text>
                <Text style={styles.packageDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={[styles.packageDetails, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Text style={styles.duration}>
                    {item.time} {t.salonProfile.packages.packageDetails.duration}
                  </Text>
                  <Text style={styles.price}>
                    {item.amount} {t.salonProfile.packages.priceUnit}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
    // textAlign: 'left',
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
    textAlign: 'right',
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  packageCardWrapper: {
    position: 'relative',
    marginHorizontal: 10,
  },
  packageCard: {
    width: 280,
    backgroundColor: Colors.black,
    borderRadius: 12,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  salonImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  packageInfo: {
    padding: 8,
    backgroundColor: Colors.black,
  },
  packageName: {
    fontSize: 14,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    marginBottom: 2,
  },
  salonName: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
    marginBottom: 2,
  },
  packageDescription: {
    fontSize: 10,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    marginBottom: 6,
    opacity: 0.8,
  },
  packageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.white,
  },
  duration: {
    fontSize: 11,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    opacity: 0.8,
  },
  price: {
    fontSize: 13,
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
  },
  discountBadgeContainer: {
    position: 'absolute',
    right: -8,
    top: 20,
    zIndex: 2,
  },
  discountBadge: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  discountAmount: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Maitree-Bold',
  },
});

export default PackagesSection; 