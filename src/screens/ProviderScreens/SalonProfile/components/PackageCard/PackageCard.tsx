import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Package} from '../../../../../types/salon';
import styles from './PackageCard.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/store';
import Colors from '../../../../../constants/Colors';

interface PackageCardProps {
  packageName: string;
  description: string;
  duration: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  image?: string;
  isSelected: boolean;
  onAddPress: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
  isRTL?: boolean;
  translations: {
    name: string;
    description: string;
    duration: string;
    price: string;
    oldPrice?: string;
    discount?: string;
    add: string;
    remove: string;
    edit: string;
    delete: string;
    priceUnit: string;
  };
}

const PackageCard: React.FC<PackageCardProps> = ({
  packageName,
  description,
  duration,
  price,
  oldPrice,
  discountPercentage,
  image,
  isSelected,
  onAddPress,
  onEditPress,
  onDeletePress,
  isRTL = false,
  translations
}) => {
  const userType = useSelector((state: RootState) => state.auth.user?.type);
  const isProvider = userType === 'salon';

  const calculateDiscount = () => {
    if (discountPercentage !== undefined) {
      return discountPercentage;
    }
    if (oldPrice && price) {
      const discount = ((oldPrice - price) / oldPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
      {image && (
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={[styles.content, isRTL && styles.contentRTL]}>
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{translations.name}:</Text>
          <Text style={styles.name}>{packageName}</Text>
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{translations.description}:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        
        <View style={[styles.details, isRTL && styles.detailsRTL]}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{translations.duration}:</Text>
            <Text style={styles.duration}>{duration}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{translations.price}:</Text>
            <View style={styles.priceContainer}>
              {oldPrice && (
                <Text style={styles.oldPrice}>{`${oldPrice} ${translations.priceUnit}`}</Text>
              )}
              <Text style={styles.price}>{`${price} ${translations.priceUnit}`}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.actions, isRTL && styles.actionsRTL]}>
          {isProvider ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={onEditPress}>
                <Text style={styles.buttonText}>{translations.edit}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={onDeletePress}>
                <Text style={styles.buttonText}>{translations.delete}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={onAddPress}>
              <Text style={styles.buttonText}>
                {isSelected ? translations.remove : translations.add}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default PackageCard; 