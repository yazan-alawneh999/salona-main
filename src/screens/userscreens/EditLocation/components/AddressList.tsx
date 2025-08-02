import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/Colors';
import { AddressListProps, Address } from '../types';
import { useTranslation } from '../../../../contexts/TranslationContext';

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onDelete,
  onToggleFavorite,
  onSetPrimary,
  loading,
  onEdit
}) => {
  const { t } = useTranslation();
  const renderAddressItem = ({ item }: { item: Address }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.addressInfo}>
          <Text style={styles.addressTitle}>
            {item.isCurrentLocation ? t.editLocation.currentLocation : item.description}
          </Text>
          {item.isPrimary && (
            <View style={styles.primaryBadge}>
              <Text style={styles.primaryText}>{t.editLocation.primaryLocation}</Text>
            </View>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => onToggleFavorite(item.id)}
            style={styles.iconButton}
          >
            <Icon 
              name={item.isFavorite ? "favorite" : "favorite-border"} 
              size={24} 
              color={Colors.gold} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onEdit && onEdit(item)}
            style={styles.iconButton}
          >
            <Icon name="edit" size={24} color={Colors.gold} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={styles.iconButton}
          >
            <Icon name="delete" size={24} color={Colors.gold} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        // onPress={() => onSetPrimary(item.id)}
        style={[
          styles.setPrimaryButton,
          item.isPrimary && styles.setPrimaryButtonActive
        ]}
      >
        <Text style={[
          styles.setPrimaryText,
          item.isPrimary && styles.setPrimaryTextActive
        ]}>
          {item.isPrimary ? t.editLocation.primaryLocation : t.editLocation.primaryLocation}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={addresses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderAddressItem}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  addressCard: {
    backgroundColor: Colors.black,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    marginBottom: 5,
  },
  primaryBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  primaryText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 8,
  },
  setPrimaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  setPrimaryButtonActive: {
    backgroundColor: Colors.gold,
  },
  setPrimaryText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
  },
  setPrimaryTextActive: {
    color: Colors.white,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default AddressList; 