import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Colors } from '../../constants/Colors';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
  },
  selectedContainer: {
    borderColor: Colors.selected,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  contentRTL: {
    direction: 'rtl',
  },
  fieldContainer: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.text,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.text,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsRTL: {
    direction: 'rtl',
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.text,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Maitree-Bold',
    color: Colors.text,
  },
  oldPrice: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.text,
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  discountText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Maitree-Bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionsRTL: {
    direction: 'rtl',
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
  },
  editButton: {
    borderColor: Colors.edit,
  },
  deleteButton: {
    borderColor: Colors.delete,
  },
  addButton: {
    borderColor: Colors.add,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Maitree-Bold',
    color: Colors.text,
  },
});

export default PackageCard; 