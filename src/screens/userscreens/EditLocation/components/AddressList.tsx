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
    <TouchableOpacity 
      style={styles.addressItem}
      onPress={() => onSetPrimary && onSetPrimary(item.id)}
    >
      <View style={styles.addressContent}>
        <View style={styles.locationIcon}>
          <Icon name="location-on" size={20} color="#666" />
        </View>
        
        <View style={styles.addressDetails}>
          <Text style={styles.addressName}>
            {item.isCurrentLocation ? t.editLocation.currentLocation : item.description}
          </Text>
          <Text style={styles.addressText}>
            {item.isCurrentLocation ? t.editLocation.currentLocation : item.description}
          </Text>
        </View>
        
        <View style={styles.radioButton}>
          <View style={[
            styles.radioCircle,
            item.isPrimary && styles.radioCircleSelected
          ]}>
            {item.isPrimary && <View style={styles.radioDot} />}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAddressItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity style={styles.addNewButton}>
        <Icon name="add" size={24} color="#666" />
        <Text style={styles.addNewText}>Add New Shipping Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  addressItem: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  locationIcon: {
    marginRight: 12,
  },
  addressDetails: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  radioButton: {
    marginLeft: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: Colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  addNewText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default AddressList; 