import React, {useState} from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from '../../../../contexts/TranslationContext';

const DeliveryLocationSheet = ({
  selectedAddress,
  handleSelected,
  addresses,
  setCurrentLocation,
  addNewAddress,
  currenctLocation,
}) => {
  const {t, isRTL} = useTranslation();
  //   const [selectedId, setSelectedId] = useState('5');

  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleSelected(item)}>
        <Icon name="location-outline" size={20} color="#000" />
        <View style={styles.textContainer}>
          {/* <Text style={styles.label}>{item.label}</Text> */}
          <Text style={styles.address}>{item.description}</Text>
        </View>
        {selectedAddress?.id === item.id && (
          <Icon name="checkmark-circle" size={20} color="#e37673" />
        )}
      </TouchableOpacity>
      {index < addresses.length - 1 && <View style={styles.separator} />}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={addNewAddress}>
        <Icon
          name="navigate-outline"
          size={20}
          color="#000"
          style={styles.footerIcon}
        />
        <Text style={styles.footerText}>
          {t.home.deliverToDifferentLocation}
        </Text>
        <Icon
          name={isRTL ? 'chevron-back' : 'chevron-forward'}
          size={20}
          color="#ddd"
          style={styles.footerIcon}
        />
      </TouchableOpacity>

      {currenctLocation && (
        <TouchableOpacity
          style={styles.footerButton}
          onPress={setCurrentLocation}>
          <Icon
            name="location"
            size={20}
            color="#000"
            style={styles.footerIcon}
          />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>
              {t.home.deliverToCurrentLocation}
            </Text>
            <Text style={styles.footerSubText}>
              {currenctLocation.description || t.home.currentLocation}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <FlatList
      data={addresses}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListHeaderComponent={
        <Text style={styles.header}>{t.home.savedLocations}</Text>
      }
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default DeliveryLocationSheet;

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 10,
    paddingTop: 8,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    // fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
    fontFamily: 'Poppins-Bold',
  },
  address: {
    color: '#555',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
    gap: 16,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 0.5,
    padding: 12,
    borderRadius: 8,
  },
  footerIcon: {
    marginTop: 2,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  footerTextContainer: {
    flex: 1,
  },
  footerSubText: {
    color: '#666',
    fontSize: 12,
  },
});
